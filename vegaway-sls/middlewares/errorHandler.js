const AWS = require("aws-sdk");
const createResponse = require("../utils/response");
require("dotenv").config(); // Load environment variables from .env

module.exports = () => ({
  onError: (handler) => {
    const statusCode = handler.error.statusCode || 500; // Default to 500 if undefined
    const message = handler.error.message || "Internal Server Error";

    handler.response = createResponse(statusCode, message);
    return handler.response;
  },
});

/* Författare: Isak
 *
 * Error handler middleware
 */
