const middy = require("@middy/core");
const validateKey = require("../middlewares/validateKey");
const errorHandler = require("../middlewares/errorHandler");

module.exports.handler = middy(async (event) => {
  try {
    return;
  } catch (error) {
    return error;
  }
})
  .use(validateKey())
  .use(errorHandler());

/* NOT IN USE */
