'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('splynx_customers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customer_number: {
        type: Sequelize.STRING
      },
      customer_id: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      package: {
        type: Sequelize.STRING
      },
      login: {
        type: Sequelize.STRING
      },
      router_contention: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('splynx_customers');
  }
};