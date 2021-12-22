const sequelize = require("sequelize");
const axios = require("axios");
const Invoices = require("../../models").sales_invoices;
const Sales = require("../../models").sales_lines;
//initialization
var invoiceUrl = "http://It-Support:2020Mawingu@102.133.170.192:7058/MawinguLive/ODataV4/Company('MAWINGU%20NETWORKS%20LTD')/Power_BI_Posted_Sales_Invoices_Today";
var salesLineUrl = "http://It-Support:2020Mawingu@102.133.170.192:7058/MawinguLive/ODataV4/Company('MAWINGU%20NETWORKS%20LTD')/Sales_Invoice";
module.exports = {
  getNavInvoices(result) {
    var config = {
      method: "get",
      url: invoiceUrl,
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log("its trying to call nav invoices endpoint");
    axios(config)
      .then((res) => {
        //save ti invoice table
        let data = res.data.value;
        let invoice = [];
        for (let i = 0; i < data.length; i++) {
          invoice.push({
            customer_no: data[i].Sell_to_Customer_No,
            invoice_number: data[i].No,
            amount: data[i].Amount,
            amount_inc_vat: data[i].Amount_Including_VAT,
            posting_date: data[i].Posting_Date,
            created_at: Date.now(),
            updated_at: Date.now(),
          });
        }
        Invoices.bulkCreate(invoice, {
          fields: [
            "customer_no",
            "invoice_number",
            "amount",
            "amount_inc_vat",
            "posting_date",
            "created_at",
            "updated_at",
          ],
          // updateOnDuplicate: [
          //   "status",
          //   "location",
          //   "geolocation",
          //   "updated_at",
          //   "processed",
          // ],
        })
          .then((resp) => {
            result(null, resp);
          })
          .catch((err) => {
            result(err.message, null);
          });
      })
      .catch((error) => {
        console.log(error);
        result(error.message, null);
      });
  },
  getNavSaleLines(result) {
    var config = {
      method: "get",
      url: salesLineUrl,
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log("its trying to call sales lines endpoint");
    axios(config)
      .then((res) => {
        // if(res.length > 0){
        //update column
        //save ti invoice table
        let data = res.data.value;
        // console.log("sales line invoice ",data)
        let invoice = [];
        for (let i = 0; i < data.length; i++) {
          // console.log(data[i], i)
          invoice.push({
            customer_no: data[i].Sell_to_Customer_No,
            document_number: data[i].Document_No,
            invoice_number: data[i].Document_No,
            amount: data[i].Amount,
            amount_inc_vat: data[i].Amount_Including_VAT,
            posting_date: data[i].Posting_Date,
            gl_account: data[i].No,
            description: data[i].Description,
            created_at: Date.now(),
            updated_at: Date.now(),
          })
        }
        // console.log(invoice)
          Sales.bulkCreate(invoice, {
            fields: [
              "customer_no",
              "invoice_number",
              "amount",
              "amount_inc_vat",
              "posting_date",
              "gl_account",
              "description",
              "created_at",
              "updated_at",
              "document_number",
            ],
          })
            .then((resp) => {
              result(null, resp);
            })
            .catch((err) => {
              result(err.message, null);
            });
          // } //end if res
          // else {
            console.log(resp)
          // }
      })
      .catch((error) => {
        console.log(error);
        result(error.message, null);
      });
  },
};
