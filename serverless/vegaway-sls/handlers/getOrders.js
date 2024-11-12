// handlers/getOrders.js
const AWS = require("aws-sdk");
const createResponse = require("../utils/response");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  const status = event.queryStringParameters?.status; // Expecting "Pending" or "Active"

  if (!status) {
    return createResponse(400, "Missing required query parameter: status");
  }

  const params = {
    TableName: "vegaway-sls-orders",
    KeyConditionExpression: "#orderStatus = :status",
    ExpressionAttributeNames: {
      "#orderStatus": "orderStatus",
    },
    ExpressionAttributeValues: {
      ":status": status,
    },
  };

  try {
    const result = await dynamoDb.query(params).promise();
    return createResponse(
      200,
      `Orders with status ${status} fetched successfully`,
      result.Items
    );
  } catch (error) {
    console.error("Error fetching orders:", error);
    return createResponse(500, "Failed to fetch orders", {
      error: error.message,
    });
  }
};

/* 
Författare: Isak
Handler som hämtar beställningar från databasen baserat på orderStatus
*/
