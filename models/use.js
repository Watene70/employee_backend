"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {
      // define association here
    }
  }
  users.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user_type",
    }
  );
  users.associate = function (models) {
    users.hasMany(models.users, {
      foreignKey: "user_type_id",
      onDelete: "CASCADE",
      as: "user_user_type",
    });
  };
  return users;
};
