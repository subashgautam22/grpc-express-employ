'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  return Promise.all([
  queryInterface.addColumn('employ_mig','FULLNAMEs', {
    type: Sequelize.STRING(50),
    defaultValue:null
  
  })
  ]);
  },
  
  down: (queryInterface, Sequelize) => {
  return Promise.all([queryInterface.removeColumn('employ_mig','FULLNAMEs')]);
  }
  };