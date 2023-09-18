"use strict";
const common_vendor = require("../../common/vendor.js");
const common_util = require("../../common/util.js");
if (!Array) {
  const _easycom_rank_header2 = common_vendor.resolveComponent("rank-header");
  const _easycom_play_shortcut2 = common_vendor.resolveComponent("play-shortcut");
  (_easycom_rank_header2 + _easycom_play_shortcut2)();
}
const _easycom_rank_header = () => "../../components/rank-header/rank-header.js";
const _easycom_play_shortcut = () => "../../components/play-shortcut/play-shortcut.js";
if (!Math) {
  (_easycom_rank_header + _easycom_play_shortcut)();
}
const _sfc_main = {
  __name: "rank-list-deail",
  setup(__props) {
    const store = common_vendor.useStore();
    common_vendor.onLoad((option) => {
      store.dispatch("rank/getRankListById", option.id);
    });
    const hot = common_vendor.computed(() => {
      const data = rankList.value;
      return common_util.getHot([data.subscribedCount, data.commentCount, data.shareCount]);
    });
    const opacity = common_vendor.ref(0);
    common_vendor.onPageScroll(({ scrollTop }) => {
      opacity.value = scrollTop / 200;
      if (opacity.value > 1)
        opacity.value = 1;
    });
    const { rankList } = common_vendor.toRefs(store.state.rank);
    const listAvatar = common_vendor.computed(() => {
      return store.getters["rank/rankListAvatar"];
    });
    const songs = common_vendor.computed(() => {
      return store.getters["rank/listTracks"];
    });
    function playMusic(id) {
      common_vendor.index.navigateTo({
        url: `/pages/play/play?id=${id}&list=${rankList.value.id}`
      });
    }
    return (_ctx, _cache) => {
      return {
        a: `url(${common_vendor.unref(rankList).coverImgUrl})`,
        b: common_vendor.p({
          opacity: opacity.value,
          pageName: {
            name: common_vendor.unref(rankList).name
          }
        }),
        c: common_vendor.unref(rankList).coverImgUrl,
        d: common_vendor.unref(listAvatar).avatarUrl,
        e: common_vendor.t(common_vendor.unref(listAvatar).nickname),
        f: common_vendor.t(common_vendor.unref(rankList).description),
        g: common_vendor.t(common_vendor.unref(hot)[0]),
        h: common_vendor.t(common_vendor.unref(hot)[1]),
        i: common_vendor.t(common_vendor.unref(hot)[2]),
        j: common_vendor.t(common_vendor.unref(songs).length),
        k: common_vendor.f(common_vendor.unref(songs), (song, index, i0) => {
          return {
            a: common_vendor.t(index + 1),
            b: common_vendor.t(song.name),
            c: common_vendor.t(common_vendor.unref(common_util.singer)(song.ar)),
            d: song.mv,
            e: song.id,
            f: common_vendor.o(($event) => playMusic(song.id), song.id)
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3c078acc"], ["__file", "E:/UniApp/cloudMusic/cloudMusicApp/pages/rank-list-deail/rank-list-deail.vue"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
