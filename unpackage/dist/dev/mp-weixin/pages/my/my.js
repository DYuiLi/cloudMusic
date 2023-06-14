"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  setup() {
    const sorts = common_vendor.reactive([
      { id: 1, des: "最近播放", icon: "icon-login" },
      { id: 2, des: "本地/下载", icon: "icon-login" },
      { id: 3, des: "云盘", icon: "icon-login" },
      { id: 4, des: "已购", icon: "icon-login" },
      { id: 5, des: "我的好友", icon: "icon-login" },
      { id: 6, des: "收藏和赞", icon: "icon-login" },
      { id: 7, des: "我的播客", icon: "icon-login" },
      { id: 8, des: "乐谜团", icon: "icon-login" }
    ]);
    return {
      username: "Yui_Lii",
      sorts
    };
  }
};
if (!Array) {
  const _easycom_custom_header2 = common_vendor.resolveComponent("custom-header");
  const _easycom_play_shortcut2 = common_vendor.resolveComponent("play-shortcut");
  (_easycom_custom_header2 + _easycom_play_shortcut2)();
}
const _easycom_custom_header = () => "../../components/custom-header/custom-header.js";
const _easycom_play_shortcut = () => "../../components/play-shortcut/play-shortcut.js";
if (!Math) {
  (_easycom_custom_header + _easycom_play_shortcut)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0,
    b: common_vendor.t($setup.username),
    c: common_vendor.f($setup.sorts, (item, k0, i0) => {
      return {
        a: common_vendor.n(item.icon),
        b: common_vendor.t(item.des),
        c: item.id
      };
    }),
    d: common_vendor.f(6, (item, k0, i0) => {
      return {};
    }),
    e: common_vendor.f(3, (item, k0, i0) => {
      return {};
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/WebVue/uniApp/cloudMusic/cloudMusicApp/pages/my/my.vue"]]);
wx.createPage(MiniProgramPage);
