const sequelize = require("sequelize");
const Op = sequelize.Op;
const maswali = require("../../models").questions;

module.exports = {
  getQuestions(result) {
    maswali
      .findAll({
        order: [["question_id", "ASC"]],
      })
      .then((quiz) => {
        result(null, quiz);
      })
      .catch((err) => {
        result(err, null);
      });
  },
};
