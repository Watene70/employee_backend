"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class choices extends Model {
    static associate(models) {
      // define association here
    }
  }
  choices.init(
    {
      question_id: DataTypes.INTEGER,
      choice: DataTypes.STRING,
      correct: DataTypes.BOOLEAN,
      choice: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "choices",
    }
  );

  choices.associate = function (models) {
    choices.belongsTo(models.topics, {
      onDelete: "CASCADE",
      foreignKey: "topic_id",
    });
  };
  return choices;
};
