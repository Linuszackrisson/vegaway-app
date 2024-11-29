const middy = require("@middy/core");
const validateKey = require("../middlewares/validateKey");
const errorHandler = require("../middlewares/errorHandler");
const createResponse = require("../utils/response");
const { DynamoDB } = require("aws-sdk");
const { jwtDecode } = require("jwt-decode");

const dynamoDB = new DynamoDB.DocumentClient();

module.exports.handler = middy(async (event) => {
  try {
    const body = JSON.parse(event.body);
    console.log("Event body:", body);

    const orderId = body.orderId;

    // Get the ID token from the 'x-cognito-id' header
    const idToken = event.headers["x-cognito-id"];
    if (!idToken) {
      return createResponse(400, "ID token is required");
    }

    // Decode the ID token to extract the claims
    let decoded;
    try {
      decoded = jwtDecode(idToken); // Decode the token
    } catch (error) {
      console.error("Error decoding id token", error);
      return createResponse(500, "Failed to decode ID token");
    }

    // Ensure the email exists in the decoded token
    const userEmail = decoded.email;
    if (!userEmail) {
      return createResponse(500, "Email claim not found in the ID token");
    }

    const params = {
      TableName: "vegaway-sls-orders",
      Key: { orderId },
      UpdateExpression: `
    SET #items = :items,
        totalPrice = :totalPrice
  `,
      ExpressionAttributeNames: {
        "#items": "items", // Alias the 'items' field to avoid reserved keyword conflict
      },
      ExpressionAttributeValues: {
        ":items": body.items,
        ":totalPrice": body.totalPrice,
        ":userEmail": userEmail,
        ":isConfirmed": "true",
      },
      ConditionExpression:
        "customerEmail = :userEmail AND isConfirmed <> :isConfirmed",
      ReturnValues: "ALL_NEW",
    };

    // Attempt the update
    let result;
    try {
      result = await dynamoDB.update(params).promise();
    } catch (error) {
      // Make sure the order has not been confirmed by staff
      if (error.code === "ConditionalCheckFailedException") {
        return createResponse(
          400,
          "Staff has confirmed the order. Updating the order is no longer possible"
        );
      }

      // Make sure the owner of the order initiated the request
      if (error.code === "ConditionalCheckFailedException") {
        return createResponse(
          403,
          "Unauthorized: Email does not match the order's owner"
        );
      }
      throw error; // Rethrow other errors
    }

    return createResponse(200, "Order updated successfully", result);
  } catch (error) {
    console.error("Failed to update order:", error);
    return createResponse(500, "Failed to update order", {
      error: error.message,
    });
  }
})
  .use(validateKey())
  .use(errorHandler());

/*
 * Författare: Isak
 *
 * Handler som tar emot en order, söker upp motsvarande order i databasen och uppdaterar den
 */
