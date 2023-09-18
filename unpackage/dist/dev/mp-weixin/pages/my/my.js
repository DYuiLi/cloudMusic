"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_custom_header2 = common_vendor.resolveComponent("custom-header");
  const _easycom_play_shortcut2 = common_vendor.resolveComponent("play-shortcut");
  const _easycom_drawer2 = common_vendor.resolveComponent("drawer");
  (_easycom_custom_header2 + _easycom_play_shortcut2 + _easycom_drawer2)();
}
const _easycom_custom_header = () => "../../components/custom-header/custom-header.js";
const _easycom_play_shortcut = () => "../../components/play-shortcut/play-shortcut.js";
const _easycom_drawer = () => "../../components/drawer/drawer.js";
if (!Math) {
  (_easycom_custom_header + _easycom_play_shortcut + _easycom_drawer)();
}
const _sfc_main = {
  __name: "my",
  setup(__props) {
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
    const username = common_vendor.ref("Yui_Lii");
    let isShowDrawer = common_vendor.ref(false);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(($event) => common_vendor.isRef(isShowDrawer) ? isShowDrawer.value = !common_vendor.unref(isShowDrawer) : isShowDrawer = !common_vendor.unref(isShowDrawer)),
        b: common_assets._imports_0,
        c: common_vendor.t(username.value),
        d: common_vendor.f(sorts, (item, k0, i0) => {
          return {
            a: common_vendor.n(item.icon),
            b: common_vendor.t(item.des),
            c: item.id
          };
        }),
        e: common_vendor.f(6, (item, k0, i0) => {
          return {};
        }),
        f: common_vendor.f(3, (item, k0, i0) => {
          return {};
        }),
        g: common_vendor.unref(isShowDrawer)
      }, common_vendor.unref(isShowDrawer) ? {
        h: common_vendor.o(($event) => common_vendor.isRef(isShowDrawer) ? isShowDrawer.value = !common_vendor.unref(isShowDrawer) : isShowDrawer = !common_vendor.unref(isShowDrawer))
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/UniApp/cloudMusic/cloudMusicApp/pages/my/my.vue"]]);
wx.createPage(MiniProgramPage);
