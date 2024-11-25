const middy = require("@middy/core");
const validateKey = require("../middlewares/validateKey");
const errorHandler = require("../middlewares/errorHandler");
const createResponse = require("../utils/response");
const { DynamoDB } = require("aws-sdk");
const { jwtDecode } = require("jwt-decode");

const dynamoDB = new DynamoDB.DocumentClient();

module.exports.handler = middy(async (event) => {
  try {
    const orderId = String(event.pathParameters.orderId);

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

    // Fetch the order from DynamoDB
    const params = {
      TableName: "vegaway-sls-orders",
      Key: { orderId },
    };

    const result = await dynamoDB.get(params).promise();

    console.log(result);

    // Check if the order exists
    if (!result.Item) {
      console.error("Table item not found");
      return createResponse(404, "Order not found");
    }

    // Ensure the user is authorized to view this order
    if (result.Item.customerEmail !== userEmail) {
      return createResponse(403, "Unauthorized to access this order");
    }

    return createResponse(200, "Order status fetched", {
      isConfirmed: result.Item.isConfirmed,
    });
  } catch (error) {
    console.error("Error fetching order status:", error);
    return createResponse(500, "Internal server error", {
      error: error.message,
    });
  }
})
  .use(validateKey())
  .use(errorHandler());
