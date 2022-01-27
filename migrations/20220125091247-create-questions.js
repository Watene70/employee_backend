"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("questions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      topic_id: {
        type: Sequelize.INTEGER,
      },
      question: {
        type: Sequelize.STRING,
      },
      marks: {
        type: Sequelize.INTEGER,
      },
      choice1: {
        type: Sequelize.STRING,
      },
      choice2: {
        type: Sequelize.STRING,
      },
      choice3: {
        type: Sequelize.STRING,
      },
      correct_answer: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("questions");
  },
};
