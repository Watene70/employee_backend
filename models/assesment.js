"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class assesment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  assesment.init(
    {
      question_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      time_taken: DataTypes.INTEGER,
      marks: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "assesment",
    }
  );
  assesment.associate = function (models) {
    assesment.belongsTo(models.topics, {
      onDelete: "CASCADE",
      foreignKey: "topic_id",
    });
    assesment.belongsTo(models.users, {
      onDelete: "CASCADE",
      foreignKey: "user_id",
    });
  };
  return assesment;
};
