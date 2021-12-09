"use strict";
module.exports = (sequelize, DataTypes) => {
  const tariffs = sequelize.define(
    "tariffs",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      tariff_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      title: {
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
      tableName: "tariffs",
      operatorsAliases: false,
    }
  );
  tariffs.associate = function (models) {
    // associations can be defined here
  };
  return tariffs;
};
