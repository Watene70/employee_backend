"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "topics",
      [
        {
          name: "Attendance and Leave Policy",
          policy:
            "Unexcused and unreported absences don’t count as hours worked",
          updatedAt: new Date(),
          createdAt: new Date(),
        },
        {
          name: "Email and Internet Policy",
          policy:
            "Every female employee is allowed to take up to 91 days off for maternity leave which is fully paidd",
          updatedAt: new Date(),
          createdAt: new Date(),
        },
        {
          name: "Confidentiality Agreement Policy",
          policy:
            "is a legal agreement that binds one or more parties to non-disclosure of confidential or proprietary information",
          updatedAt: new Date(),
          createdAt: new Date(),
        },
        {
          name: "Dress Code Policy",
          policy:
            "Unexcused and unreported absences don’t count as hours worked",
          updatedAt: new Date(),
          createdAt: new Date(),
        },
        {
          name: "Bereavement Policy",
          policy:
            "Unexcused and unreported absences don’t count as hours worked",
          updatedAt: new Date(),
          createdAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("topics", null, {});
  },
};
