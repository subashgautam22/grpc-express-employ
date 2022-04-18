'use strict';
(() => {
  const { dbHelper } = require('../../../helpers');
  module.exports = async (call, callback) => {
    let connection;
    try {
      // let response = { status: false, message: 'read Failed' };
      
      connection = await dbHelper.getConnection();
      const [rows] = await connection.query(`UPDATE grpc.employ_mig SET is_delete= 1 where id =?`,
      [
        call.id
      ]);  
     
    
       

      return rows;
    } catch (error) {
      throw error;
    } 
  };
})();