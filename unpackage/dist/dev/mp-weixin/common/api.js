"use strict";
const common_request = require("./request.js");
const reqBanner = () => {
  return common_request.requests({ url: "banner", method: "GET" });
};
const reqRecmdList = () => {
  return common_request.requests({ url: "personalized?limit=5", method: "GET" });
};
const reqRecmdSong = () => {
  return common_request.requests({ url: "personalized/newsong?limit=7", method: "GET" });
};
const reqRank = () => {
  return common_request.requests({ url: "toplist", method: "GET" });
};
const reqRankList = (id) => {
  return common_request.requests({ url: `playlist/detail?id=${id}`, method: "GET" });
};
const reqSingleDetail = (ids) => {
  return common_request.requests({ url: `song/detail?ids=${ids}`, method: "GET" });
};
const reqSingleUrl = (id) => {
  return common_request.requests({ url: `song/url?id=${id}`, method: "GET" });
};
const reqLyrics = (id) => {
  return common_request.requests({ url: `lyric?id=${id}`, method: "GET" });
};
exports.reqBanner = reqBanner;
exports.reqLyrics = reqLyrics;
exports.reqRank = reqRank;
exports.reqRankList = reqRankList;
exports.reqRecmdList = reqRecmdList;
exports.reqRecmdSong = reqRecmdSong;
exports.reqSingleDetail = reqSingleDetail;
exports.reqSingleUrl = reqSingleUrl;
