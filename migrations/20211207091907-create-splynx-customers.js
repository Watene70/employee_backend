"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("splynx_customers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      customer_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      customer_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      location: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      geolocation: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      package: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      login: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      router_contention: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Date.now,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Date.now,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("splynx_customers");
  },
};
