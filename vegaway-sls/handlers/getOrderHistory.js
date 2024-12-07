const AWS = require("aws-sdk");
const createResponse = require("../utils/response");
const middy = require("@middy/core");
const validateKey = require("../middlewares/validateKey");
const errorHandler = require("../middlewares/errorHandler");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const { jwtDecode } = require("jwt-decode");

module.exports.handler = middy(async (event) => {
  try {
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
      return createResponse(400, "Failed to decode ID token");
    }

    // Ensure the email exists in the decoded token
    const customerEmail = decoded.email;
    if (!customerEmail) {
      return createResponse(500, "Email claim not found in the ID token");
    }

    const params = {
      TableName: "vegaway-sls-orders",
      IndexName: "CustomerEmailIndex", // Use the GSI
      KeyConditionExpression: "#customerEmail = :customerEmail",
      ExpressionAttributeNames: {
        "#customerEmail": "customerEmail",
      },
      ExpressionAttributeValues: {
        ":customerEmail": customerEmail,
      },
      ScanIndexForward: false, // Ensures results are sorted by `createdAt` in descending order
    };

    const result = await dynamoDb.query(params).promise();

    console.log("Result:", result);

    return createResponse(
      200,
      "Order history fetched successfully",
      result.Items
    );
  } catch (error) {
    console.error("Error fetching order history:", error);
    return createResponse(500, "Failed to fetch order history", {
      error: error.message,
    });
  }
})
  .use(validateKey())
  .use(errorHandler());

/* Författare: Isak
 *
 * Handler som hämtar en användares order historik
 */
