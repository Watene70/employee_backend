"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user_type extends Model {
    static associate(models) {}
  }
  user_type.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user_type",
    }
  );
  user_type.associate = function (models) {
    user_type.hasMany(models.users, {
      foreignKey: "user_type_id",
      onDelete: "CASCADE",
      as: "user_user_type",
    });
  };
  return user_type;
};
