"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const store_index = require("./store/index.js");
require("./store/indexBar.js");
require("./common/api.js");
require("./common/request.js");
require("./store/rank.js");
require("./common/util.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/my/my.js";
  "./pages/login/login.js";
  "./pages/rank/rank.js";
  "./pages/search/search.js";
  "./pages/rank-list-deail/rank-list-deail.js";
  "./pages/play/play.js";
}
const _sfc_main = {
  __name: "App",
  setup(__props) {
    return (_ctx, _cache) => {
      return {};
    };
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/UniApp/cloudMusic/cloudMusicApp/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(store_index.store);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
