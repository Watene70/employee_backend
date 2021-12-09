"use strict";
module.exports = (sequelize, DataTypes) => {
  const sectors = sequelize.define(
    "sectors",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      router_id: {
        type: DataTypes.INTEGER,
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
      tableName: "sectors",
      operatorsAliases: false,
    }
  );
  sectors.associate = function (models) {
    // associations can be defined here
  };
  return sectors;
};
