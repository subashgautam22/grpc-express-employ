"use strict";

(() => {
  const sql = require("../sql");
  const httpStatus = require("http-status");
  module.exports = async (call, callback) => {
    try {
      let response = {
        status: httpStatus.BAD_REQUEST,
        message: "Create Failed",
      };
      if (parseFloat(call.request.salary) <= 0) {
        response.message = "invalids salary";
        return callback(null, response);
      }
      let thisDate =
        new Date().getMonth() +
        1 +
        "/" +
        new Date().getDate() +
        "/" +
        new Date().getFullYear();
      if (call.request.joindate < thisDate) {
        response.message = "ERROR please enter latest date in mm/dd/yy formate";
        return callback(null, response);
      }

      const dbResponse = await sql.create(call.request);

      if (dbResponse.status === true) {
        response.status = httpStatus.OK;
        response.message = dbResponse.message;
      }
      return callback(null, response);
    } catch (error) {
      return callback(error);
    }
  };
})();

// if(call.request.FULLNAMEs===null)
//       {
//         return `${call.request.first_name}+${call.request.last_name}`,response

//       }
