const sequelize = require("sequelize");
const Op = sequelize.Op;
const mtihani = require("../../models").assesment;
const topics = require("../../models").topics;
const questions = require("../../models").questions;
const { create_error } = require("../validation");

module.exports = {
  getAssesment(result) {
    mtihani
      .findAll({
        raw: true,
      })
      .then((test) => {
        console.log(test);
        result(null, test);
      })
      .catch((err) => {
        result(err, null);
      });
  },
  getUserAssesment(result) {
    topics
      .findAll({
        attributes: [`id`],
        raw: true,
      })
      .then((dbtopics) => {
        // console.log(dbtopics);
        topicsarr = [];
        for (j = 0; j < dbtopics.length; j++) {
          topic_id = dbtopics[j].id;
          topicsarr.push(topic_id);
        }

        questions
          .findAll({
            raw: true,
            where: {
              topic_id: topicsarr,
            },
          })
          .then((dbquestions) => {
            res_arr = [];
            for (i = 0; i < dbtopics.length; i++) {
              topic_id = dbtopics[i].id;

              let topicquestion = dbquestions.filter(
                (qsn) => qsn.topic_id === topic_id
              );

              let randomquestions = topicquestion
                .sort(() => 0.5 - Math.random())
                .slice(0, 2);
              for (k = 0; k < randomquestions.length; k++) {
                res_arr.push(randomquestions[k]);
              }
            }
            result(null, res_arr);
          });
      })
      .catch((err) => {
        result(err, null);
      });
  },

  postAssesment(assesment, result) {
    mtihani
      .findOne({
        raw: true,
        attributes: ["assessment_number"],
        where: {
          user_id: assesment[0].user_id,
        },
        order: [["createdAt", "DESC"]],
      })
      .then((number) => {
        
        let newnumber;
        if (number) {
          newnumber = number.assessment_number + 1;
        } else {
          newnumber = 1;
        }
        for (i = 0; i < assesment.length; i++) {
          let assesment_single = assesment[i];
          questions
            .findOne({
              raw: true,
              where: {
                id: assesment_single.question_id,
              },
              order: [["createdAt", "DESC"]],
            })
            .then((dbquestion) => {
              let dbansw = dbquestion.correct_answer;
              let average_score;
              if (dbansw == assesment_single.answer) {
                average_score = Math.round(40 / assesment_single.time_taken);
              } else {
                average_score = 0;
              }

              mtihani
                .create({
                  question_id: assesment_single.question_id,
                  user_id: assesment_single.user_id,
                  time_taken: assesment_single.time_taken,
                  marks: average_score,
                  assessment_number: newnumber,
                  created_at: new Date(),
                })
                .then(() => {
                  // result(null, {
                  //   message: "Success",
                  // });
                })
                .catch((err) => {
                  // result(err, null);
                });
            })
            .catch((err) => {
              // result(err, null);
            });
        }
        result(null, {
          message: "success",
        });
      })
      .catch((err) => {
        result(err, null);
      });
  },

  getLatestResult(user, result) {
    mtihani
      .findOne({
        attributes: ["assessment_number"],
        raw: true,
        where: {
          user_id: user,
        },
        order: [["createdAt", "DESC"]],
      })
      .then((number) => {
        mtihani
          .findAll({
            attributes: ["marks"],
            where: {
              user_id: user,
              assessment_number: number.assessment_number,
            },
            raw: true,
          })
          .then((dbmarks) => {
            sum = 0;
            for (i = 0; i < dbmarks.length; i++) {
              let allmarks = dbmarks[i].marks;
              sum += allmarks;
            }
            result(null, {
              latest_result: sum,
            });
          })
          .catch((err) => {
            result(err, null);
          });
      })
      .catch((err) => {
        result(err, null);
      });
  },

  getFailedTopics(user, result) {
    mtihani
      .findOne({
        attributes: ["assessment_number"],
        raw: true,
        where: {
          user_id: user,
        },
        order: [["createdAt", "DESC"]],
      })
      .then((number) => {
        mtihani
          .findAll({
            where: {
              user_id: user,
              assessment_number: number.assessment_number,
            },
            raw: true,
          })
          .then((dbmarks) => {
            // sum=0
            // for (i = 0; i < dbmarks.length; i++) {
            //   let allmarks = dbmarks[i].marks;
            //   sum+=allmarks
            // }
            result(null, {
              latest_result: sum,
            });
          })
          .catch((err) => {
            result(err, null);
          });
      })
      .catch((err) => {
        result(err, null);
      });
  },
};
