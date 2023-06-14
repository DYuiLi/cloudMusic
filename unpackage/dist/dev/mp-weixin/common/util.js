"use strict";
const common_vendor = require("./vendor.js");
common_vendor.ref(false);
function setSessionInfo(item, value) {
  sessionStorage.setItem(item, JSON.stringify(value));
  console.log(item, value);
  common_vendor.wx$1.setStorage({
    key: item,
    data: value
  });
}
function getSessionInfo(item) {
  return common_vendor.wx$1.getStorage({ key: item });
}
function singer(list) {
  let singer2;
  if (list[0].name) {
    singer2 = list[0].name;
    for (let i = 1; i < list.length; i++) {
      singer2 = singer2 + "/" + list[i].name;
    }
  } else {
    singer2 = list[0];
    for (let i = 1; i < list.length; i++) {
      singer2 = singer2 + "/" + list[i];
    }
  }
  return singer2;
}
function timeFormat(time) {
  if (time && typeof time === "string") {
    time = time.replace(":", ".");
    time = time.split(".");
    return time[0] * 60 + time[1] * 1 + time[2] / 100;
  } else if (time) {
    time = parseInt(time / 1e3);
    const min = parseInt(time / 60);
    const seconds = time % 60;
    return seconds < 10 ? "0" + min + ":0" + seconds : "0" + min + ":" + seconds;
  } else {
    return "00:00";
  }
}
function goListDetail(id) {
  common_vendor.index.navigateTo({
    url: `/pages/rank-list-deail/rank-list-deail?id=${id}`
  });
}
function getHot(data) {
  return data.map((num) => {
    if (num > 99999999) {
      return (num / 1e8).toFixed(1) + "亿";
    } else if (num > 9999) {
      return (num / 1e4).toFixed(1) + "万";
    } else {
      return num + "";
    }
  });
}
exports.getHot = getHot;
exports.getSessionInfo = getSessionInfo;
exports.goListDetail = goListDetail;
exports.setSessionInfo = setSessionInfo;
exports.singer = singer;
exports.timeFormat = timeFormat;
