// handlers/updateMenuItem.js
const AWS = require("aws-sdk");
const createResponse = require("../utils/response");
const middy = require("@middy/core");
const validateKey = require("../middlewares/validateKey");
const errorHandler = require("../middlewares/errorHandler");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const validateStaff = require("../middlewares/validateStaff");

module.exports.handler = middy(async (event) => {
  try {
    // Parse the request body to get the menu item details
    const { menuId, name, description, price } = JSON.parse(event.body);

    // Check that menuId and at least one field to update is provided
    if (!menuId || (!name && !description && price === undefined)) {
      return createResponse(
        400,
        "Invalid input: menuId and at least one field to update are required"
      );
    }

    // Build the update expression dynamically based on provided fields
    let updateExpression = "SET";
    const expressionAttributeValues = {};
    const expressionAttributeNames = {};

    if (name) {
      updateExpression += " #name = :name,";
      expressionAttributeValues[":name"] = name;
      expressionAttributeNames["#name"] = "name";
    }
    if (description) {
      updateExpression += " #description = :description,";
      expressionAttributeValues[":description"] = description;
      expressionAttributeNames["#description"] = "description";
    }
    if (price !== undefined) {
      updateExpression += " #price = :price,";
      expressionAttributeValues[":price"] = price;
      expressionAttributeNames["#price"] = "price";
    }

    // Remove trailing comma if any fields were added
    updateExpression = updateExpression.endsWith(",")
      ? updateExpression.slice(0, -1)
      : updateExpression;

    const params = {
      TableName: "vegaway-sls-menu",
      Key: { menuId },
      UpdateExpression: updateExpression,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: "ALL_NEW", // Returns the updated item attributes
    };

    const result = await dynamoDb.update(params).promise();

    return createResponse(
      200,
      "Menu item updated successfully",
      result.Attributes
    );
  } catch (error) {
    console.error("Error updating menu item:", error);
    // Defaulting to status code 500 if error status code is undefined
    return createResponse(
      error.statusCode || 500,
      "Failed to update menu item",
      {
        error: error.message,
      }
    );
  }
})
  .use(validateKey())
  .use(errorHandler())
  .use(validateStaff());

/* Författare: Isak
 *
 * Handler som uppdaterar en menyartikel i databasen
 */
