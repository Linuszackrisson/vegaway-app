const { jwtDecode } = require("jwt-decode");
const createResponse = require("../utils/response");
module.exports = () => ({
  before: (handler) => {
    const token = handler.event.headers["x-cognito-id"];

    if (!token) {
      handler.response = createResponse(401, "Missing or invalid token");
      return;
    }

    // Decode the token and check the user's group
    try {
      const decodedToken = jwtDecode(token);
      const groups = decodedToken["cognito:groups"];

      // Check if the user is in the "Staff" group
      if (!groups || !groups.includes("Staff")) {
        handler.response = createResponse(
          401,
          "Access denied. User is not in the Staff group"
        );
        return; // Prevent further execution
      }
    } catch (error) {
      console.error("Token validation error:", error);
      handler.response = createResponse(401, "Invalid token");
      return; // Prevent further execution
    }
  },
});

/* 
Författare: Isak

Middleware som verifierar att avnändaren finns i Staff user group i cognito
*/
