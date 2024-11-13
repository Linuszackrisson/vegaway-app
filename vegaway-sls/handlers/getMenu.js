// handlers/getMenu.js
const AWS = require("aws-sdk");
const createResponse = require("../utils/response");
const middy = require("@middy/core");
const validateKey = require("../middlewares/validateKey");
const errorHandler = require("../middlewares/errorHandler");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = middy(async (event) => {
  console.log("Request received:", event); // Log the event to see the request details
  try {
    const params = {
      TableName: "vegaway-sls-menu", // Replace with your actual table name
    };

    // Fetch all items from the table
    const result = await dynamoDb.scan(params).promise();

    // Assume result.Items holds your menu items
    return createResponse(200, "Menu fetched successfully", result.Items);
  } catch (error) {
    console.error("Error fetching menu:", error);
    return createResponse(500, "Failed to fetch menu", {
      error: error.message,
    });
  }
})
  .use(validateKey())
  .use(errorHandler());

/* 
Författare isak
Handler som hämtar meny från databasen
*/
