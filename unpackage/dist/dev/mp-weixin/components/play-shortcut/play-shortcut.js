"use strict";
const common_vendor = require("../../common/vendor.js");
const common_util = require("../../common/util.js");
const _sfc_main = {
  __name: "play-shortcut",
  setup(__props) {
    const { picUrl, name, singer, id } = common_vendor.reactive(common_util.getSessionInfo("songInfo") || {});
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1].route;
    const bars = ["pages/index/index", "pages/my/my", "pages/login/login"];
    let bottom = bars.includes(currentPage);
    let play = common_vendor.ref(true);
    function swiftButton() {
      play.value = !play.value;
    }
    function toPlayPage() {
      common_vendor.index.navigateTo({
        url: `/pages/play/play?id=${id}`
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(picUrl)
      }, common_vendor.unref(picUrl) ? common_vendor.e({
        b: common_vendor.unref(picUrl),
        c: common_vendor.t(common_vendor.unref(name)),
        d: common_vendor.t(common_vendor.unref(singer)),
        e: common_vendor.o(toPlayPage),
        f: common_vendor.unref(play)
      }, common_vendor.unref(play) ? {} : {}, {
        g: common_vendor.o(swiftButton),
        h: common_vendor.unref(bottom) ? 1 : ""
      }) : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/UniApp/cloudMusic/cloudMusicApp/components/play-shortcut/play-shortcut.vue"]]);
wx.createComponent(Component);
