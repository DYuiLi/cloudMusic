"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "rank-header",
  props: {
    pageName: {
      name: String,
      singer: String
    },
    opacity: Number
  },
  setup(__props) {
    const props = __props;
    const { pageName, opacity } = common_vendor.toRefs(props);
    function goBack() {
      common_vendor.index.navigateBack();
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(goBack),
        b: common_vendor.t(common_vendor.unref(pageName).name),
        c: common_vendor.unref(pageName).singer
      }, common_vendor.unref(pageName).singer ? {
        d: common_vendor.t(common_vendor.unref(pageName).singer)
      } : {}, {
        e: `rgba(238, 44, 44, ${common_vendor.unref(opacity)})`
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0ca4bcdb"], ["__file", "E:/UniApp/cloudMusic/cloudMusicApp/components/rank-header/rank-header.vue"]]);
wx.createComponent(Component);
