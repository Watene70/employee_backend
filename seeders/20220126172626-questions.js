"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "questions",
      [
        {
          question: "Are unreported absence count as hours worked?",
          topic_id: 1,
          marks: 10,
          choice: "",
          updatedAt: new Date(),
          createdAt: new Date(),
        },
        {
          question:
            "How many days is one entitled in a year as compassionate leave?",
          topic_id: 1,
          marks: 10,
          choice: "",
          updatedAt: new Date(),
          createdAt: new Date(),
        },
        {
          question:
            "All clothes must project professionalism. Clothes that are too revealing or inappropriate aren’t allowed",
          topic_id: 2,
          marks: 10,
          choice: "",
          updatedAt: new Date(),
          createdAt: new Date(),
        },
        {
          question:
            "Dress code sets a visual image of the person at the workplace.",
          topic_id: 2,
          marks: 10,
          choice: "",
          updatedAt: new Date(),
          createdAt: new Date(),
        },
        {
          question:
            "Does the confidentiality Agreement policy clearly define what information is confidential?",
          topic_id: 3,
          marks: 10,
          choice: "",
          updatedAt: new Date(),
          createdAt: new Date(),
        },
        {
          question:
            "Confidentiality agreement policy is a legally binding contract that states two parties will not share or profit from confidential information",
          topic_id: 3,
          marks: 10,
          choice: "",
          updatedAt: new Date(),
          createdAt: new Date(),
        },
        {
          question:
            "Email and internet policy ensures employee's use their email in a way that is aligned with the aims of the business",
          topic_id: 4,
          marks: 10,
          choice: "",
          updatedAt: new Date(),
          createdAt: new Date(),
        },
        {
          question:
            "One of the items is double check you have the correct recipient",
          topic_id: 4,
          marks: 10,
          choice: "",
          choice: "",
          updatedAt: new Date(),
          createdAt: new Date(),
        },
        {
          question: "Can an employer ask for proof of bereavement?",
          topic_id: 5,
          choice: "",
          marks: 10,

          updatedAt: new Date(),
          createdAt: new Date(),
        },
        {
          question: "What is covered under bereavement leave?",
          topic_id: 5,
          marks: 10,
          choice: "",
          updatedAt: new Date(),
          createdAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("questions", null, {});
  },
};
