<<<<<<< HEAD
const sequelize = require("sequelize");
const axios = require("axios");
const op = sequelize.Op;
const splinx = require("../../models").Splynx_customers;
const stations = require("../../models").sectors;

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
  getNavInvoices(result) {
    var config = {
      method: "get",
      url: "http://It-support:2020Mawingu@102.133.170.192:7058/MawinguLive/ODataV4/Company(%27MAWINGU%20NETWORKS%20LTD%27)/Posted_Sales_Invoices",
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios(config)
      .then((res) => {
        //update column
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
        result(error.message, null);
      });
  },
  getSplynxTickets(result) {
    api
      .login(SplynxApi.LOGIN_TYPE_API_KEY, {
        key: loadedConfig.API_KEY,
        secret: loadedConfig.API_SECRET,
      })
      .then((logins) => {
        console.log(logins);
        let url = "admin/support/tickets";
        api
          .get(url)
          .then((updates) => {
            //create services
            result(null, updates);
          })
          .catch((err) => {
            result(err, null);
          });
      })
      .catch((err) => {
        console.log("not working", err);
      });
  },
  getSplynxCustomers(result) {
    api
      .login(SplynxApi.LOGIN_TYPE_API_KEY, {
        key: loadedConfig.API_KEY,
        secret: loadedConfig.API_SECRET,
      })
      .then((logins) => {
        let url = "admin/customers/customer";
        let splinxCustomers = [];
        api
          .get(url)
          .then((customers) => {
            //create services
            let updates = customers.response;
            // console.log("all after pull length ", updates);
            for (let i = 0; i < updates.length; i++) {
              splinxCustomers.push({
                customer_number: updates[i].login,
                customer_id: updates[i].id,
                location: updates[i].city,
                status: updates[i].status,
                router_contention: updates[i].sector_id,
                created_at: Date.now(),
                updated_at: Date.now(),
                status: updates[i].status,
              });
            }
            splinx
              .bulkCreate(splinxCustomers, {
                fields: [
                  "customer_number",
                  "customer_id",
                  "location",
                  "status",
                  "router_contention",
                  "created_at",
                  "updated_at",
                  "status",
                ],
              })
              .then((solve) => {
                result(null, {
                  message: "Customer pulled and created",
                });
              })
              .catch((err) => {
                result(
                  {
                    error: err.message,
                  },
                  null
                );
              });
          })
          .catch((err) => {
            result(
              {
                error: err.message,
              },
              null
            );
          });
      })
      .catch((err) => {
        result(
          {
            error: err.message,
          },
          null
        );
      });
    // console.log(logins);
  },
  getSplynxCustomerSector(result) {
    api
      .login(SplynxApi.LOGIN_TYPE_API_KEY, {
        key: loadedConfig.API_KEY,
        secret: loadedConfig.API_SECRET,
      })
      .then((logins) => {
        console.log(logins);
        let url = "admin/customers/customer/3/internet-services";
        api
          .get(url)
          .then((updates) => {
            //create services
            // console.log(updates);
            result(null, updates);
          })
          .catch((err) => {
            result(err, null);
          });
      })
      .catch((err) => {
        console.log("not working", err);
      });
  },
  getSplynxSectors(result) {
    api
      .login(SplynxApi.LOGIN_TYPE_API_KEY, {
        key: loadedConfig.API_KEY,
        secret: loadedConfig.API_SECRET,
      })
      .then((logins) => {
        console.log(logins);
        let url = "admin/networking/routers-sectors";
        let towerSector = [];
        api
          .get(url)
          .then((updates) => {
            //create services
            let towers = updates.response;
            // console.log("all after pull length ", towers);
            
            for (let i = 0; i < towers.length; i++) {
              towerSector.push({
                router_id: towers[i].router_id,
                title: towers[i].title,
                created_at: Date.now(),
                updated_at: Date.now(),
              });
            }
            stations
              .bulkCreate(towerSector, {
                fields: ["router_id", "title", "created_at", "updated_at"],
              })
              .then((solution) => {
                result(null, {
                  message: "Sector updated in Pweza",
                });
              });
          })
          .catch((err) => {
            result(err, null);
          });
      })
      .catch((err) => {
        console.log("not working", err);
      });
  },
};
=======
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
  getNavInvoices(result) {
    var config = {
      method: "get",
      url: "http://It-support:2020Mawingu@102.133.170.192:7058/MawinguLive/ODataV4/Company(%27MAWINGU%20NETWORKS%20LTD%27)/Posted_Sales_Invoices",
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios(config)
      .then((res) => {
        //update column
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
        result(error.message, null);
      });
  },
  getSplynxTickets(result) {
    api
      .login(SplynxApi.LOGIN_TYPE_API_KEY, {
        key: loadedConfig.API_KEY,
        secret: loadedConfig.API_SECRET,
      })
      .then((logins) => {
        console.log(logins);
        let url = "admin/support/tickets";
        api
          .get(url)
          .then((updates) => {
            //create services
            result(null, updates);
          })
          .catch((err) => {
            result(err, null);
          });
      })
      .catch((err) => {
        console.log("not working", err);
      });
  },
  getSplynxCustomers(result) {
    api
      .login(SplynxApi.LOGIN_TYPE_API_KEY, {
        key: loadedConfig.API_KEY,
        secret: loadedConfig.API_SECRET,
      })
      .then((logins) => {
        let url = "admin/customers/customer";
        let splinxCustomers = [];
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
                location: updates[i].city,
                status: updates[i].status,
                router_contention: updates[i].sector_id,
                created_at: Date.now(),
                updated_at: Date.now(),
                status: updates[i].status,
              });
            }
            splinx
              .bulkCreate(splinxCustomers, {
                fields: [
                  "customer_number",
                  "customer_id",
                  "location",
                  "status",
                  "router_contention",
                  "created_at",
                  "updated_at",
                  "status",
                ],
              })
              .then((solve) => {
                result(null, {
                  message: "Customer pulled and created",
                });
              })
              .catch((err) => {
                result(
                  {
                    error: err.message,
                  },
                  null
                );
              });
          })
          .catch((err) => {
            result(
              {
                error: err.message,
              },
              null
            );
          });
      })
      .catch((err) => {
        result(
          {
            error: err.message,
          },
          null
        );
      });
    // console.log(logins);
  },
  getSplynxCustomerSector(result) {
    api
      .login(SplynxApi.LOGIN_TYPE_API_KEY, {
        key: loadedConfig.API_KEY,
        secret: loadedConfig.API_SECRET,
      })
      .then((logins) => {
        console.log(logins);
        let url = "admin/customers/customer/3/internet-services";
        api
          .get(url)
          .then((updates) => {
            //create services
            console.log(updates);
            result(null, updates);
          })
          .catch((err) => {
            result(err, null);
          });
      })
      .catch((err) => {
        console.log("not working", err);
      });
  },
  getSplynxSectors(result) {
    api
      .login(SplynxApi.LOGIN_TYPE_API_KEY, {
        key: loadedConfig.API_KEY,
        secret: loadedConfig.API_SECRET,
      })
      .then((logins) => {
        console.log(logins);
        let url = "admin/networking/routers-sectors";
        api
          .get(url)
          .then((updates) => {
            //create services
            result(null, updates);
          })
          .catch((err) => {
            result(err, null);
          });
      })
      .catch((err) => {
        console.log("not working", err);
      });
  },
  updateInternetServices(data, result) {
    api
      .login(SplynxApi.LOGIN_TYPE_API_KEY, {
        key: loadedConfig.API_KEY,
        secret: loadedConfig.API_SECRET,
      })
      .then((logins) => {
        console.log("found customElements", data);
        for (let i = 0; i < data.length; i++) {
          console.log("found customer", data[i].customer_id);
          // admin/customers/customer/3/internet-services
          let urls =
            "admin/customers/customer/" +
            data[i].customer_id +
            "/internet-services";
          api
            .get(urls)
            .then((updates) => {
              // update customertable
              console.log("found service", updates);
              let resp = updates.response;
              splinx
                .update(
                  {
                    processed: 1,
                    router_contention: resp[resp.length - 1].sector_id,
                  },
                  { where: { customer_id: data[i].customer_id } }
                )
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
        console.log("not working", err);
      });
  },
  getCustomers(result) {
    splinx
      .findAll({ attributes: ["*"], where: { processed: 0 }, raw: true })
      .then((leads) => {
        result(null, leads);
      })
      .catch((err) => {
        result(err, null);
      });
  },
};
>>>>>>> d4c4a32963be9e5cf56260566a17d46845e7338f
