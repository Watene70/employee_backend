const sequelize = require("sequelize");
const axios = require("axios");
const Lead = require("../../models").Lead;
const Update = require("../../models").Update;
const op = sequelize.Op;
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
  getLeads(result) {
    Lead.findAll({ attributes: ["*"], where: { processed: 0 }, raw: true })
      .then((leads) => {
        result(null, leads);
      })
      .catch((err) => {
        result(err, null);
      });
  },
  getCustomers(result) {
    Update.findAll({ attributes: ["*"], where: { processed: 0 }, raw: true })
      .then((leads) => {
        result(null, leads);
      })
      .catch((err) => {
        result(err, null);
      });
  },
  postToNav(data, result) {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      let indiv = {
        Name: data[i].name,
        CustomerCategory: 1,
        Address: data[i].address,
        PhoneNumber: data[i].phone_number,
        EmailAddress: data[i].email,
        Region: data[i].county,
        Package: data[i].package,
      };
      let json = JSON.stringify(indiv);
      console.log(json);
      var config = {
        method: "post",
        url: "https://cloud.cft.co.ke/index.php/api/general/CreateCustomer",
        headers: {
          "Content-Type": "application/json",
        },
        data: json,
      };
      axios(config)
        .then((res) => {
          //update column
          Lead.update({ processed: 1 }, { where: { id: data[i].id } })
            .then((upda) => {
              console.log(upda);
            })
            .catch((err) => {
              console.log(err);
            });
          result(null, JSON.stringify(res.data));
        })
        .catch((error) => {
          console.log(error);
          result(error.message, null);
        });
    }
  },
  createLeads(allData, result) {
    var arr = [];
    let ids = [];
    api
      .login(SplynxApi.LOGIN_TYPE_API_KEY, {
        key: loadedConfig.API_KEY,
        secret: loadedConfig.API_SECRET,
      })
      .then((logins) => {
        for (let r = 0; r < allData.length; r++) {
          var update = {
            name: allData[r].customer_name,
            email: allData[r].customer_email,
            phone: allData[r].customer_phone,
            login: allData[r].id,
          };
          let url = "admin/customers/customer/";
          api
            .post(url, update)
            .then((updates) => {
              //create services
              var service = {
                tariff_id: allData[r].splynx_package,
                customer_id: updates.response.id,
                status: "active",
                description: "Some Description",
                quantity: 1,
                start_date: new Date().toISOString().slice(0, 10),
                end_date: "0000-00-00",
                login: allData[r].id,
                taking_ipv4: 0,
              };
              let urls =
                "admin/customers/customer/" +
                updates.response.id +
                "/internet-services";
              api
                .post(urls, service)
                .then((services) => {
                  let is = parseInt(allData[r].id);
                  Update.update({ processed: 1 }, { where: { id: is } })
                    .then((upda) => {
                      console.log(upda);
                    })
                    .catch((err) => {
                      result(err, null);
                    });
                })
                .catch((err) => {
                  console.log("services errors  are", err);
                });
              result(null, { message: "All leads added" });
            })
            .catch((err) => {
              console.log("error is", err);
            });
        }
        console.log(ids);
      })
      .catch((err) => {
        console.log("not working", err);
        result(err, null);
      });
  },
  createSingleLead(allData, result) {
    api
      .login(SplynxApi.LOGIN_TYPE_API_KEY, {
        key: loadedConfig.API_KEY,
        secret: loadedConfig.API_SECRET,
      })
      .then((logins) => {
        var update = {
          name: allData.customer_name,
          email: allData.customer_email,
          phone: allData.customer_phone,
          login: allData.customer_id,
        };
        let url = "admin/customers/customer/";
        api
          .post(url, update)
          .then((updates) => {
            //create services
            var service = {
              tariff_id: allData.tarrif_id,
              customer_id: updates.response.id,
              status: "active",
              description: "Some Description",
              quantity: 1,
              start_date: new Date().toISOString().slice(0, 10),
              end_date: "0000-00-00",
              login: allData.customer_id,
              taking_ipv4: 0,
            };
            let urls =
              "admin/customers/customer/" +
              updates.response.id +
              "/internet-services";
            api
              .post(urls, service)
              .then((services) => {
                result(null, { message: "Lead Successfully added" });
              })
              .catch((err) => {
                result({ message: "This error has occured", err }, null);
              });
          })
          .catch((err) => {
            result({ error: err }, null);
          });
      })
      .catch((err) => {
        result({ error: err }, null);
      });
  },
  postSingleToNav(data, result) {
    let datas = {
      Name: data.name,
      CustomerCategory: data.category,
      Address: data.address,
      PhoneNumber: data.phone_number,
      EmailAddress: data.email,
      Region: data.county,
      Package: data.package,
    };
    var config = {
      method: "post",
      url: "https://cloud.cft.co.ke/index.php/api/general/CreateCustomer",
      headers: {
        "Content-Type": "application/json",
      },
      data: datas,
    };
    axios(config)
      .then((res) => {
        result(null, {
          message:
            "Customer added to Nav ID:" + JSON.stringify(res.data.response),
        });
      })
      .catch((error) => {
        console.log(error);
        result({ error: error.message }, null);
      });
  },
};
