const middy = require("@middy/core");
const validateKey = require("../middlewares/validateKey");
const errorHandler = require("../middlewares/errorHandler");
const createResponse = require("../utils/response");
const { DynamoDB } = require("aws-sdk");

const dynamoDB = new DynamoDB.DocumentClient();

module.exports.handler = middy(async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");

    const params = {
      TableName: "vegaway-sls-orders",
      Item: {
        ...body,
        orderId: body.orderId || `order-${Date.now()}`,
        isConfirmed: "false",
        createdAt: Date.now(),
      },
    };

    await dynamoDB.put(params).promise();

    return createResponse(200, "Order placed successfully.", {
      orderId: params.Item.orderId,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    return createResponse(500, "Failed to place order.", {
      error: error.message,
    });
  }
})
  .use(validateKey())
  .use(errorHandler());

/* 
Författare: Isak

Handler som tar emot innehåll från varukorgen och gör det till en order
*/
