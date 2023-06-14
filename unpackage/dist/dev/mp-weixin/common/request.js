"use strict";
const common_vendor = require("./vendor.js");
const baseUrl = "http://localhost:3000/";
function requests(options = {}) {
  options.url = baseUrl + options.url, options.method = options.method || "GET", // 设置请求头
  options.header = {
    //appid: ""			// 前后端交互的token
  };
  return new Promise((resolve, reject) => {
    options.success = (res) => {
      resolve(res.data);
    };
    options.fail = (err) => {
      reject(err);
    };
    common_vendor.index.request(options);
    common_vendor.wx$1.request(options);
  });
}
exports.requests = requests;
