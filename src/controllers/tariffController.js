const sequelize = require("sequelize");
const axios = require("axios");
const op = sequelize.Op;
const splinx = require("../../models").Splynx_customers;
const internet = require("../../models").tariffs;

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
  getTariffInternet(result) {
    api
      .login(SplynxApi.LOGIN_TYPE_API_KEY, {
        key: loadedConfig.API_KEY,
        secret: loadedConfig.API_SECRET,
      })
      .then((logins) => {
        console.log(logins);
        let url = "/admin/tariffs/internet";
        api
          .get(url)
          .then((updates) => {
            //create services
            // console.log(updates);
            let netPlan = updates.response;
            let internetTariff = [];
            // console.log("all after pull length ", netPlan);
            // console.log(netPlan);
            for (let i = 0; i < netPlan.length; i++) {
              internetTariff.push({
                tariff_id: netPlan[i].id,
                title: netPlan[i].title,
                created_at: Date.now(),
                updated_at: Date.now(),
              });
            }
            // console.log(internetTariff);
            internet
              .bulkCreate(internetTariff, {
                fields: ["tariff_id", "title", "created_at", "updated_at"],
              })
              .then((solution) => {
                result(null, {
                  message: "Tariffs updated in Pweza",
                });
              })
              .catch((err) => {
                result(err, null);
              });
          })

          .catch((err) => {
            result(err, null);
          });
      })
      .catch((err) => {
        // console.log("not working", err);
      });
  },
};
