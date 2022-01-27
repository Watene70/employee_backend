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
      password: DataTypes.STRING,
      user_type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  users.associate = function (models) {
    users.hasMany(models.assesment, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
      as: "user_assesments",
    });
    users.associate = function (models) {
      users.belongsTo(models.users, {
        onDelete: "CASCADE",
        foreignKey: "topic_id",
        as: "user_user_type",
      });
    };
  };
  return users;
};
