"use strict";
module.exports = (sequelize, DataTypes) => {
  const location = sequelize.define(
    "location",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      location_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "location",
      operatorsAliases: false,
    }
  );
  location.associate = function (models) {
    // associations can be defined here
  };
  return location;
};
