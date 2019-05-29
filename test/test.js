const sdk = require("../dist/index.js");
const axios = require("axios");
// const sdk = require("../lib/index.ts");
// sdk.default.connector
axios
  .post(
    "http://web-api-test.energymost.com/API/common/setlanguage",
    {
      language: "zh-cn"
    },
    {
      proxy: {
        host: "101.231.121.17",
        port: 80
      }
    }
  )
  .then(result => {
    console.log("success");

    console.log(result);
  })
  .catch(err => {
    console.log("error");
    console.log(err);
  });
