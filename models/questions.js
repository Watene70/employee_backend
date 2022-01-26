"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class questions extends Model {
   
    static associate(models) {
      // define association here
    }
  }
  questions.init(
    {
      topic_id: DataTypes.INTEGER,
      question: DataTypes.STRING,
      marks: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "questions",
    }
  );

  questions.associate = function (models) {
    questions.belongsTo(models.topics, {
      onDelete: "CASCADE",
      foreignKey: "topic_id",
    });
  };
  return questions;
};
