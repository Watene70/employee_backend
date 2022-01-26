const sequelize = require("sequelize");
const Op = sequelize.Op;
const personage = require("../../models").users;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { create_error } = require("../validation");

const { keys } = require("../../config");

module.exports = {
  getPolicies(result) {
    personage
      .findAll({
        order: [["user_id", "ASC"]],
      })
      .then((persons) => {
        result(null, persons);
      })
      .catch((err) => {
        result(err, null);
      });
  },
  findById(id, result) {
    if (id > 0) {
      users
        .findOne({
          attributes: ["id", "name", "password", "user_type"],
          where: {
            id: id,
          },
        })
        .then((user) => {
          if (user) {
            result(null, user);
          } else {
            let err = {
              error: "Personel does not exist",
            };
            result(err, null);
          }
        })
        .catch((error) => {
          result(error, null);
        });
    } else {
      let err = {
        error: "The ID is not a number",
      };
      result(err, null);
    }
  },
  findUser(where, result) {
    personage
      .findOne({
        raw: true,
        attributes: ["*"],
        where: where,
      })
      .then((user) => {

        return result(null, user);
      })
      .catch((error) => {
        result(error, null);
      });
  },
  login(user, result) {
    this.findUser(
      {
        name: user.name,
      },
      (err, dbuser) => {
        if (err) {
          result(err, null);
        } else {
          if (dbuser) {
            console.log(dbuser.password)
            console.log(user.password)
            bcrypt
              .compare(user.password,dbuser.password)
              .then((isMatch) => {
                if (isMatch) {
                  const payload = {
                    id: dbuser.id,
                    name: dbuser.name,
                    user_type: dbuser.user_type,
                  };
                  jwt.sign(
                    payload,
                    keys.secretKey,
                    {
                      expiresIn: 31536000,
                    },
                    (err, token) => {
                      if (err) {
                        const customError = create_error(err);
                        result(customError, null);
                      } else {
                        const res = {
                          accessToken: token,
                          expires_in: "24h",
                        };
                        result(null, res);
                      }
                    }
                  );
                } else {
                  const customError = create_error({
                    password: "You have entered an incorrect password",
                  });
                  result(customError, null);
                }
              });
          } else {
            const customError = create_error({
              name: "User name does not exist",
            });
            result(customError, null);
          }
        }
      }
    );
  },
};
