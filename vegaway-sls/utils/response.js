// utils/response.js

module.exports = function createResponse(statusCode, message, data = {}) {
  return {
    statusCode,
    body: JSON.stringify({
      message,
      data,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };
};

/* Författare: Isak
 *
 * Utility function för att skicka responses
 */
