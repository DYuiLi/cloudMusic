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
  __name: "rank",
  setup(__props) {
    const navList = common_vendor.reactive(["官方", "精选", "曲风", "语种", "全球"]);
    const store = common_vendor.useStore();
    common_vendor.onLoad((option) => {
      store.dispatch("rank/getAllRank");
      console.log(allRanks);
    });
    const { allRanks, rankList } = common_vendor.toRefs(store.state.rank);
    let scrollTop = common_vendor.ref(0);
    common_vendor.onMounted(() => {
      window.addEventListener("scroll", () => {
        let top = document.documentElement.scrollTop;
        switch (top) {
          case top > 225:
            scrollTop.value = 1;
            break;
        }
      }, true);
    });
    function scrollTo(index) {
      switch (index) {
        case 0:
          setScrollTop(160);
          break;
      }
    }
    function setScrollTop(top) {
      common_vendor.index.pageScrollTo({
        scrollTop: top,
        duration: 100
      });
    }
    function getData(ID) {
      store.dispatch("rank/getRankListById", ID);
    }
    const recmdRank = common_vendor.computed(() => {
      store.getters["rank/recmdRank"].forEach((item) => {
        getData(item.id);
      });
      return store.getters["rank/recmdRank"];
    });
    const offRank = common_vendor.computed(() => {
      store.getters["rank/offRank"].forEach((item) => {
        getData(item.id);
      });
      return store.getters["rank/offRank"];
    });
    function goListDetail(id) {
      common_vendor.index.navigateTo({
        url: `/pages/rank-list-deail/rank-list-deail?id=${id}`
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(navList, (nav, index, i0) => {
          return {
            a: common_vendor.t(nav),
            b: index,
            c: common_vendor.unref(scrollTop) === index ? 1 : "",
            d: common_vendor.o(($event) => scrollTo(index), index)
          };
        }),
        b: common_vendor.p({
          pageName: {
            name: "排行榜"
          }
        }),
        c: common_vendor.f(common_vendor.unref(recmdRank), (rank, k0, i0) => {
          return {
            a: rank.coverImgUrl,
            b: rank.id,
            c: common_vendor.o(($event) => goListDetail(rank.id), rank.id)
          };
        }),
        d: common_vendor.f(common_vendor.unref(offRank), (rank, k0, i0) => {
          return {
            a: common_vendor.t(rank.name),
            b: common_vendor.t(rank.updateFrequency),
            c: rank.coverImgUrl,
            d: common_vendor.f(rank.tracks, (song, index, i1) => {
              return {
                a: common_vendor.t(index + 1),
                b: common_vendor.t(song.name),
                c: common_vendor.t(common_vendor.unref(common_util.singer)(song.ar)),
                d: song.id
              };
            }),
            e: rank.id,
            f: common_vendor.o(($event) => goListDetail(rank.id), rank.id)
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-716fbf2c"], ["__file", "F:/WebVue/uniApp/cloudMusic/cloudMusicApp/pages/rank/rank.vue"]]);
wx.createPage(MiniProgramPage);
