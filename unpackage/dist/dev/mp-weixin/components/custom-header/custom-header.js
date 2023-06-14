"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  emits: ["show"],
  setup(props, context) {
    function showDrawer() {
      context.emit("show");
    }
    return {
      showDrawer
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $setup.showDrawer && $setup.showDrawer(...args)),
    b: common_vendor.r("body", {
      class: "body"
    }),
    c: common_vendor.r("foot", {
      class: "footer"
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/WebVue/uniApp/cloudMusic/cloudMusicApp/components/custom-header/custom-header.vue"]]);
wx.createComponent(Component);
