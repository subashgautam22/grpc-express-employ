'use strict';
(() => {
  const { dbHelper } = require('../../../helpers');
  module.exports = async (call, callback) => {
    let connection;
    try {
      // let response = { status: false, message: 'read Failed' };
      
      connection = await dbHelper.getConnection();
      const [rows] = await connection.query(`select CONCAT(first_name , ' ' , last_name , ' ' ) as Name , swiftpost ,salary, joindate ,(salary*12) as AnnualSalary FROM grpc.employ_mig where is_delete<>1 ` );
      
       

      return rows;
    } catch (error) {
      throw error;
    }
  };
})();
