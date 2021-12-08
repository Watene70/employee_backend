"use strict";
module.exports = (sequelize, DataTypes) => {
  const Splynx_customers = sequelize.define(
    "Splynx_customers",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      customer_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      customer_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      location: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      package: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      geolocation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      login: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      router_contention: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      processed: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      geolocation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Date.now,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: Date.now,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "splynx_customers",
      operatorsAliases: false,
    }
  );
  Splynx_customers.associate = function (models) {
    // associations can be defined here
  };
  return Splynx_customers;
};
