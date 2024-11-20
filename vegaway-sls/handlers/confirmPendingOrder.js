const AWS = require("aws-sdk");
const middy = require("@middy/core");
const validateKey = require("../middlewares/validateKey");
const errorHandler = require("../middlewares/errorHandler");
const createResponse = require("../utils/response");

const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.handler = middy(async (event) => {
  try {
    // Parse the orderId from the request body
    const requestBody = JSON.parse(event.body);
    const { orderId } = requestBody;

    // Validate orderId
    if (!orderId) {
      return createResponse(400, "orderId is required");
    }

    // Update the order in the DynamoDB table
    const params = {
      TableName: "vegaway-sls-orders",
      Key: { orderId }, // Assuming 'orderId' is the partition key
      UpdateExpression: "SET isConfirmed = :confirmedValue",
      ExpressionAttributeValues: {
        ":confirmedValue": "true",
      },
      ReturnValues: "UPDATED_NEW",
    };

    const result = await dynamoDB.update(params).promise();

    // Return success response with the updated attributes
    return createResponse(
      200,
      "Order confirmed successfully",
      result.Attributes
    );
  } catch (error) {
    console.error("Error confirming order:", error);
    return createResponse(500, "Internal server error", {
      error: error.message,
    });
  }
})
  .use(validateKey())
  .use(errorHandler());

/* 
Författare: Isak

Handler som tar emot en order och markerar den som behandlad.
Handlern förväntar sig ett värde för "orderId" i request body. 
*/
