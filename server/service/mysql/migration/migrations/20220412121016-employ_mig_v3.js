'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  return Promise.all([
  queryInterface.addColumn('employ_mig','is_delete', {
  type: Sequelize.TINYINT, 
  defaultValue:0
  
  })
  ]);
  },
  
  down: (queryInterface, Sequelize) => {
  return Promise.all([queryInterface.removeColumn('employ_mig','is_delete')]);
  }
  };