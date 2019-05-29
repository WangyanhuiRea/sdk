import sdk from "../dist/index";

let { connector } = sdk;

//本地调试的时候使用
// const sdk = require("../lib/index.ts");
// sdk.default.connector
connector
  .post(
    "http://web-api-test.energymost.com/API/common/setlanguage",
    {
      language: "zh-cn"
    }
    // {
    //   proxy: {
    //     host: "101.231.121.17",
    //     port: 80
    //   }
    // }
  )
  .then((result: any) => {
    console.log("success");

    console.log(result);
  })
  .catch((err: any) => {
    console.log("error");
    console.log(err);
  });
