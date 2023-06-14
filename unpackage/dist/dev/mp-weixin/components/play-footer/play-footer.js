"use strict";
const common_vendor = require("../../common/vendor.js");
const common_util = require("../../common/util.js");
if (!Array) {
  const _easycom_yui_progress2 = common_vendor.resolveComponent("yui-progress");
  _easycom_yui_progress2();
}
const _easycom_yui_progress = () => "../yui-progress/yui-progress.js";
if (!Math) {
  _easycom_yui_progress();
}
const _sfc_main = {
  __name: "play-footer",
  props: {
    time: Number
  },
  emits: ["resetTime"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const duration = common_vendor.computed(() => {
      return common_util.timeFormat(props.time);
    });
    let current = common_vendor.ref("00:00");
    let timer;
    let progress = common_vendor.ref(0);
    common_vendor.onLoad(() => {
      common_vendor.index.$on("playing", (context) => {
        play.value = true;
        timer = setInterval(() => {
          current.value = common_util.timeFormat(context.currentTime * 1e3 + 100);
          progress.value = context.currentTime / context.duration * 100;
        }, 1e3);
      });
      common_vendor.index.$on("paused", () => {
        play.value = false;
        clearInterval(timer);
      });
    });
    function setProgress(value) {
      let realTime = value / 100 * props.time;
      emits("resetTime", realTime / 1e3 + 0.06);
      current.value = common_util.timeFormat(realTime);
      progress.value = value;
    }
    const loops = ["icon-loop", "icon-singleloop", "icon-random"];
    let loopIndex = common_vendor.ref(0);
    function loopMode() {
      loopIndex.value++;
      loopIndex.value %= 3;
    }
    const play = common_vendor.ref(false);
    function playOrPause() {
      play.value = !play.value;
      common_vendor.index.$emit("playMusic", play.value);
    }
    function lastSong() {
      common_vendor.index.$emit("lastSong");
    }
    function nextSong() {
      common_vendor.index.$emit("nextSong");
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(common_vendor.unref(current)),
        b: common_vendor.o(setProgress),
        c: common_vendor.p({
          progress: common_vendor.unref(progress)
        }),
        d: common_vendor.t(common_vendor.unref(duration)),
        e: common_vendor.n(loops[common_vendor.unref(loopIndex)]),
        f: common_vendor.o(loopMode),
        g: common_vendor.o(lastSong),
        h: play.value
      }, play.value ? {} : {}, {
        i: common_vendor.o(playOrPause),
        j: common_vendor.o(nextSong)
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "F:/WebVue/uniApp/cloudMusic/cloudMusicApp/components/play-footer/play-footer.vue"]]);
wx.createComponent(Component);
