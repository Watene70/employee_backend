const sequelize = require("sequelize");
const axios = require("axios");
const op = sequelize.Op;
const splinx = require("../../models").Splynx_customers;

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
  getSplynxCustomers(result) {
    api
      .login(SplynxApi.LOGIN_TYPE_API_KEY, {
        key: loadedConfig.API_KEY,
        secret: loadedConfig.API_SECRET,
      })
      .then((logins) => {
        let url = "admin/customers/customer";
        let splinxCustomers = [];
        // console.log(splinxCustomers);
        api
          .get(url)
          .then((customers) => {
            //create services
            let updates = customers.response;
            console.log("all after pull length ", updates);
            for (let i = 0; i < updates.length; i++) {
              splinxCustomers.push({
                customer_number: updates[i].login,
                customer_id: updates[i].id,
                date_added: updates[i].date_add,
                location: updates[i].location_id,
                status: updates[i].status,
                geolocation: updates[i].gps,
                created_at: Date.now(),
                updated_at: Date.now(),
                status: updates[i].status,
                processed: 0,
              });
            }
            // console.log(splinxCustomers);
            splinx
              .bulkCreate(splinxCustomers, {
                fields: [
                  "customer_number",
                  "customer_id",
                  "date_added",
                  "location",
                  "status",
                  "geolocation",
                  "created_at",
                  "updated_at",
                  "status",
                ],
                updateOnDuplicate: [
                  "status",
                  "location",
                  "geolocation",
                  "updated_at",
                  "processed",
                ],
              })
              .then((solve) => {
                // console.log(solve);
                result(null, {
                  message: "Customer pulled and created",
                });
              })
              .catch((err) => {
                result(
                  {
                    errorbulkCreate: err,
                  },
                  null
                );
              });
          })
          .catch((err) => {
            result(
              {
                errorfetch: err.message,
              },
              null
            );
          });
      })
      .catch((err) => {
        result(
          {
            errorlogin: err.message,
          },
          null
        );
      });
    // console.log(logins);
  },

  updateInternetServices(data, result) {
    api
      .login(SplynxApi.LOGIN_TYPE_API_KEY, {
        key: loadedConfig.API_KEY,
        secret: loadedConfig.API_SECRET,
      })
      .then((logins) => {
        // console.log("found customElements", data);
        for (let i = 0; i < data.length; i++) {
          // console.log("found customer", data[i].customer_id);
          // admin/customers/customer/3/internet-services
          let urls =
            "admin/customers/customer/" +
            data[i].customer_id +
            "/internet-services";
          api
            .get(urls)
            .then((updates) => {
              // update customertable
              //   console.log("found service", updates);
              let resp = updates.response;
              let datas = {
                processed: 1,
                package: resp[resp.length - 1].tariff_id,
                router_contention: resp[resp.length - 1].sector_id,
              };
              // console.log("to update fields", datas);
              splinx
                .update(datas, { where: { customer_id: data[i].customer_id } })
                .then((upda) => {
                  console.log(upda);
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log("error getting service", err);
            });
        }
        result(null, "customers updated");
      })
      .catch((err) => {
        // console.log("not working", err);
      });
  },
  getCustomers(result) {
    splinx;
    //     .findAll({
    //       attributes: ["*"],
    //       where: { processed: 0 },
    //       raw: true,
    //       limit: 200,
    //     })
    //     .then((leads) => {
    //       result(null, leads);
    //     })
    //     .catch((err) => {
    //       result(err, null);
    //     });
  },
};
