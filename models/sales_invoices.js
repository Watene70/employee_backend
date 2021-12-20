"use strict";
module.exports = (sequelize, DataTypes) => {
  const sales_invoices = sequelize.define(
    "sales_invoices",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      invoice_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      customer_no: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      amount_inc_vat: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      posting_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Date.now(),
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: Date.now(),
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "sales_invoices",
      operatorsAliases: false,
    }
  );
  sales_invoices.associate = function (models) {
    // associations can be defined here
  };
  return sales_invoices;
};
