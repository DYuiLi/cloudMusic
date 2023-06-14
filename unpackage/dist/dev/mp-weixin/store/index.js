"use strict";
const common_vendor = require("../common/vendor.js");
const store_indexBar = require("./indexBar.js");
const store_rank = require("./rank.js");
const store = common_vendor.createStore({
  modules: {
    index: store_indexBar.index,
    rank: store_rank.rank
  }
});
exports.store = store;
