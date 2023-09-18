"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "drawer",
  emits: ["hide"],
  setup(__props, { emit: emits }) {
    const personalList = common_vendor.reactive([
      { id: 1, icon: "icon-message", des: "我的消息" },
      { id: 2, icon: "icon-shopping", des: "商城" }
    ]);
    const settingsList = common_vendor.reactive([
      { id: 1, icon: "icon-settings", des: "设置" },
      { id: 2, icon: "icon-night", des: "夜间模式" },
      { id: 3, icon: "icon-timer", des: "定时退出" },
      { id: 4, icon: "icon-theme", des: "个性装扮" },
      { id: 5, icon: "icon-download", des: "边听边存" },
      { id: 6, icon: "icon-youth", des: "青少年模式" },
      { id: 7, icon: "icon-alarm", des: "音乐闹钟" }
    ]);
    const otherList = common_vendor.reactive([
      { id: 1, icon: "icon-service", des: "我的客服" },
      { id: 2, icon: "icon-about", des: "关于" }
    ]);
    const username = "立即登录";
    let isClose = common_vendor.ref(false);
    const pageLocation = common_vendor.ref();
    function hideDrawer() {
      isClose.value = true;
      document.body.style.position = "static";
      window.scrollTo(0, pageLocation.value);
      setTimeout(function() {
        emits("hide");
      }, 300);
    }
    function nightMode(event) {
      console.log(event.detail.value);
    }
    common_vendor.onMounted(() => {
      let scrollTop = window.scrollY;
      pageLocation.value = scrollTop;
      document.body.style.position = "fixed";
      document.body.style.top = "-" + scrollTop + "px";
    });
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.t(username),
        c: common_vendor.f(personalList, (per, k0, i0) => {
          return {
            a: common_vendor.n(per.icon),
            b: common_vendor.t(per.des),
            c: per.id
          };
        }),
        d: common_vendor.f(settingsList, (set, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.n(set.icon),
            b: common_vendor.t(set.des),
            c: set.id !== 2
          }, set.id !== 2 ? {} : {
            d: common_vendor.o(nightMode, set.id)
          }, {
            e: set.id
          });
        }),
        e: common_vendor.f(otherList, (ot, k0, i0) => {
          return {
            a: common_vendor.n(ot.icon),
            b: common_vendor.t(ot.des),
            c: ot.id
          };
        }),
        f: common_vendor.unref(isClose) ? 1 : "",
        g: common_vendor.o(hideDrawer)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/UniApp/cloudMusic/cloudMusicApp/components/drawer/drawer.vue"]]);
wx.createComponent(Component);
