const AWS = require("aws-sdk");
require("dotenv").config(); // Load environment variables from .env

module.exports.validateKey = () => ({
  before: (handler) => {
    const { key } = handler.event.queryStringParameters;

    if (!key) {
      throw new Error("API key missing");
    }

    // Validate the provided key against the API_KEY in .env
    if (key !== process.env.API_KEY) {
      throw new Error("Invalid API key");
    }
  },
});

/* 
Author Isak
Middleware for checking if the provided API key is valid
*/
