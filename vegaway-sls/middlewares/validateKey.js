require("dotenv").config(); // Load environment variables from .env

// Custom Error class that includes statusCode
class ApiKeyError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = () => ({
  before: (handler) => {
    const key = handler.event.headers?.authorization;

    if (!key) {
      throw new ApiKeyError("API key missing", 400); // Bad Request
    }

    // Validate the provided key against the API_KEY in .env
    if (key !== process.env.API_KEY) {
      throw new ApiKeyError("Invalid API key", 401); // Unauthorized
    }
  },
});

/* 
Author Isak
Middleware for checking if the provided API key is valid
*/
