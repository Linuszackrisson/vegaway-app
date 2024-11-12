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

// Use like this in handler:

// const createResponse = require('../utils/response');

// module.exports.handler = async (event) => {
// try {
//  const data = { /* some relevant data */ };
// return createResponse(200, "Request successful", data);
//  } catch (error) {
//  return createResponse(500, "An error occurred", { error: error.message });
//  }
// };

/* 
Författare Isak
Utility function för att skicka responses 
*/
