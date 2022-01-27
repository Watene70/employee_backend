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
      choice1: DataTypes.STRING,
      choice2: DataTypes.STRING,
      choice3: DataTypes.STRING,
      correct_answer: DataTypes.STRING,
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
