const AWS = require("aws-sdk");
const createResponse = require("../utils/response");
require("dotenv").config(); // Load environment variables from .env

module.exports.errorHandler = () => ({
  onError: (handler) => {
    handler.response = createResponse(
      handler.error.statusCode,
      handler.error.message
    );
  },
});

/* 
Author Isak
Error handler middleware
*/
