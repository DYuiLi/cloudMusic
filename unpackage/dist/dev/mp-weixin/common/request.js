"use strict";
const common_vendor = require("./vendor.js");
const baseUrl = "http://localhost:3000/";
function requests(options = {}) {
  options.url = baseUrl + options.url;
  options.method = options.method || "GET";
  options.header = {
    //appid: ""			// 前后端交互的token
  };
  return new Promise((resolve, reject) => {
    options.success = (res) => {
      switch (res.statusCode) {
        case 200:
          resolve(res.data);
          break;
      }
    };
    options.fail = (err) => {
      reject(err);
    };
    common_vendor.index.request(options);
  });
}
exports.requests = requests;
