"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "list",
  props: {
    src: String,
    // 图片
    title: String,
    // 标题
    content: String,
    // 子标题
    icon: String,
    // 右侧图标
    descrpt: String
    // 右侧信息描述
  },
  setup(__props) {
    const props = __props;
    const { src, title, content, foot, descrpt } = common_vendor.toRefs(props);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(src),
        b: common_vendor.t(common_vendor.unref(title)),
        c: common_vendor.t(common_vendor.unref(content)),
        d: __props.icon
      }, __props.icon ? common_vendor.e({
        e: common_vendor.n(__props.icon),
        f: common_vendor.unref(descrpt)
      }, common_vendor.unref(descrpt) ? {
        g: common_vendor.t(common_vendor.unref(descrpt))
      } : {}) : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-18578b00"], ["__file", "E:/UniApp/cloudMusic/cloudMusicApp/components/list/list.vue"]]);
wx.createComponent(Component);
