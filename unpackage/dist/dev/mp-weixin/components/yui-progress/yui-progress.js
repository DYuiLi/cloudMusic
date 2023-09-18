"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "yui-progress",
  props: {
    progress: Number
  },
  emits: ["progress"],
  setup(__props, { emit: emits }) {
    const props = __props;
    let prog;
    let position;
    let dotRaduis;
    let prgsVal = common_vendor.ref(0);
    common_vendor.onMounted(() => {
      prog = document.getElementById("bgd");
      position = prog.getBoundingClientRect();
      dotRaduis = 7.5 / position.width * 100;
    });
    function changeProgress(e) {
      let { clientX } = e.touches[0];
      prgsVal.value = (clientX - position.left) / position.width * 100;
      if (prgsVal.value < 0) {
        prgsVal.value = 0;
      } else if (prgsVal.value > 100) {
        prgsVal.value = 100;
      }
    }
    function touchStart(e) {
      changeProgress(e);
      emits("progress", prgsVal.value);
    }
    function touchMove(e) {
      changeProgress(e);
      emits("progress", prgsVal.value);
    }
    function touchEnd() {
      emits("progress", prgsVal.value);
    }
    return (_ctx, _cache) => {
      return {
        a: props.progress + "%",
        b: common_vendor.o(touchStart),
        c: common_vendor.o(touchEnd),
        d: props.progress - common_vendor.unref(dotRaduis) + "%",
        e: common_vendor.o(touchMove)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/UniApp/cloudMusic/cloudMusicApp/components/yui-progress/yui-progress.vue"]]);
wx.createComponent(Component);
