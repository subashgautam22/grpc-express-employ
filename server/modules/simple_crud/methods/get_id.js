
(() => {
  const sql = require('../sql');
  const httpStatus = require('http-status');
  module.exports = async (call, callback) => {
    try {
      let response = { response :{status: httpStatus.BAD_REQUEST, message: 'read  Failed'} };
      const dbResponse = await sql.get_id(call.request);
      if (dbResponse && dbResponse.length>0) {

        dbResponse.forEach(item=>{ 
          duration = (( Date.now() - (item.joindate) )/(86400000));
          item.joindate = 
           new Date(item.joindate).getMonth() + 1 +
           "-" + 
           new Date(item.joindate).getDate() + 
           "-" +
           new Date(item.joindate).getFullYear();
       
          const years = Math.floor(duration / 365);
          const months = Math.floor(duration % 365 / 30);
          const days = Math.floor(duration % 365 % 30);
          item.duration= `${years} year ${months} month ${days} days`
       
       
        });
        

        response.dataList=dbResponse[0]
        response.response.status = httpStatus.OK;
        response.response.message = "sucessfully fetched";
      }
      return callback(null, response);
    } catch (error) {
      return callback(error);
    }
  };
})();

