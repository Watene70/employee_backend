const sequelize = require("sequelize");
const axios = require("axios");
const op = sequelize.Op;
const splinx = require("../../models").Splynx_customers;
const eneo = require("../../models").location;

//initialization
const SplynxApi = require("splynx-nodejs-api");
var setup = {
  envs: {
    test: {
      API_KEY: "f86566e918169721e19537f2941aba5a",
      API_SECRET: "1906b7e13ad993b76563b1007d4215fb",
      SPLYNX_HOST: "http://196.250.208.228",
      NOTIFY_DATE: 6,
      REMINDER_DATE: 5,
      DIS_AMOUNT: 200,
      DISCONNECT_DATE: 8,
    },
    live: {
      API_KEY: "2e1f479cd6d3cb7694deed187f07279b",
      API_SECRET: "333cdcaae2fede273cb9b53ee513235f",
      SPLYNX_HOST: "https://home.mawingunetworks.com",
      NOTIFY_DATE: 7,
      REMINDER_DATE: 5,
      DIS_AMOUNT: 200,
      DISCONNECT_DATE: 6,
    },
  },
};
var env = "live"; //test for test and live for live
var loadedConfig = setup.envs[env]; //declared variables in live and test

//initialization
const api = new SplynxApi(loadedConfig.SPLYNX_HOST);
api.version = SplynxApi.API_VERSION_2_0;
module.exports = {
  getSplynxLocation(result) {
    api
      .login(SplynxApi.LOGIN_TYPE_API_KEY, {
        key: loadedConfig.API_KEY,
        secret: loadedConfig.API_SECRET,
      })
      .then((logins) => {
        console.log(logins);
        let url = "/admin/administration/locations";
        api
          .get(url)
          .then((updates) => {
            //create services
            // console.log(updates);
            let locationPlan = updates.response;
            let eneoLocation = [];
            // console.log("all after pull length ", locationPlan);
            for (let i = 0; i < locationPlan.length; i++) {
              eneoLocation.push({
                location_id: locationPlan[i].id,
                title: locationPlan[i].name,
              });
            }
            console.log(eneoLocation);
            eneo
              .bulkCreate(eneoLocation, {
                fields: ["location_id", "title"],
              })
              .then((infusion) => {
                result(null, {
                  message: "Locations updated in Pweza",
                });
              })
              .catch((err) => {
                console.log(err);
                result(err, null);
              });
          })

          .catch((err) => {
            console.log(err);
            result(err, null);
          });
      })
      .catch((err) => {
        // console.log("not working", err);
      });
  },
};
