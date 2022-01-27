"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class topics extends Model {
    static associate(models) {
      // define association here
    }
  }
  topics.init(
    {
      name: DataTypes.STRING,
      policy: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "topics",
    }
  );
  topics.associate = function (models) {
    topics.hasMany(models.questions, {
      foreignKey: "topic_id",
      onDelete: "CASCADE",
      as: "topic_questions",
    });
    topics.hasMany(models.assesment, {
      foreignKey: "topic_id",
      onDelete: "CASCADE",
      as: "topic_assesment",
    });
  };
  return topics;
};
