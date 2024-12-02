const middy = require("@middy/core");
const validateKey = require("../middlewares/validateKey");
const errorHandler = require("../middlewares/errorHandler");
const createResponse = require("../utils/response");

const dynamoDB = new DynamoDB.DocumentClient();

module.exports.handler = middy(async (event) => {
  try {
    const body = JSON.parse(event.body);
    console.log("Event body:", body);

    const orderId = body.orderId;

    // Verify request comes from a staff account here

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
        ":isConfirmed": "true",
      },
      ConditionExpression: "isConfirmed <> :isConfirmed",
      ReturnValues: "ALL_NEW",
    };

    const result = await dynamoDB.update(params).promise();

    return createResponse(200, "Pending order updated successfully", result);
  } catch (error) {
    console.error("Failed to update order:", error);
    // Handle condition failures
    if (error.code === "ConditionalCheckFailedException") {
      return createResponse(
        400,
        "Order has been confirmed and cannot be updated"
      );
    }

    return createResponse(500, "Failed to update order", {
      error: error.message,
    });
  }
})
  .use(validateKey())
  .use(errorHandler());
