// handlers/getOrders.js
const AWS = require("aws-sdk");
const createResponse = require("../utils/response");
const middy = require("@middy/core");
const validateKey = require("../middlewares/validateKey");
const errorHandler = require("../middlewares/errorHandler");
const validateStaff = require("../middlewares/validateStaff");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = middy(async (event) => {
  const isConfirmed = event.pathParameters?.isConfirmed; // Expecting "true" or "false"
  console.log("isConfirmed:", isConfirmed);

  if (isConfirmed !== "true" && isConfirmed !== "false") {
    return createResponse(
      400,
      "Missing or invalid path parameter: isConfirmed",
      isConfirmed
    );
  }

  const params = {
    TableName: "vegaway-sls-orders",
    IndexName: "IsConfirmedIndex", // Use the GSI
    KeyConditionExpression: "#isConfirmed = :isConfirmed",
    ExpressionAttributeNames: {
      "#isConfirmed": "isConfirmed",
    },
    ExpressionAttributeValues: {
      ":isConfirmed": isConfirmed,
    },
    ScanIndexForward: false, // Ensures results are sorted by `createdAt` in descending order
  };

  try {
    const result = await dynamoDb.query(params).promise();
    return createResponse(200, `Orders fetched successfully`, result.Items);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return createResponse(500, "Failed to fetch orders", {
      error: error.message,
    });
  }
})
  .use(validateKey())
  .use(errorHandler())
  .use(validateStaff());

/* Författare: Isak
 *
 * Handler för staff som hämtar beställningar från databasen baserat på isConfirmed
 */
