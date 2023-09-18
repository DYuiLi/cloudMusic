"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "custom-header",
  emits: ["show"],
  setup(__props, { emit: emits }) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.r("middle", {
          class: "middle"
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/UniApp/cloudMusic/cloudMusicApp/components/custom-header/custom-header.vue"]]);
wx.createComponent(Component);
