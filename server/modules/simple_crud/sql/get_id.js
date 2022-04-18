'use strict';
(() => {
  const { dbHelper } = require('../../../helpers');
  module.exports = async (call, callback) => {
    let connection;
    try {
      // let response = { status: false };      
      connection = await dbHelper.getConnection();
      const [rows] = await connection.query(`select  CONCAT(first_name , ' ' , last_name , ' ' ) as Name , swiftpost , joindate, salary,(salary*12) as AnnualSalary  FROM grpc.employ_mig  where id =?`,[
        call.id
      ]);  
     
       

      return rows;
    } catch (error) {
      throw error;
    } 
  };
})();
