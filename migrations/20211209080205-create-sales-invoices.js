"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("sales_invoices", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      invoice_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      customer_no: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      amount_inc_vat: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      posting_date: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("sales_invoices");
  },
};
