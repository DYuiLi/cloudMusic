"use strict";
const common_vendor = require("../../common/vendor.js");
const common_util = require("../../common/util.js");
if (!Array) {
  const _easycom_custom_header2 = common_vendor.resolveComponent("custom-header");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_play_shortcut2 = common_vendor.resolveComponent("play-shortcut");
  (_easycom_custom_header2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_play_shortcut2)();
}
const _easycom_custom_header = () => "../../components/custom-header/custom-header.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_play_shortcut = () => "../../components/play-shortcut/play-shortcut.js";
if (!Math) {
  (_easycom_custom_header + _easycom_uni_list_item + _easycom_uni_list + _easycom_play_shortcut)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const store = common_vendor.useStore();
    common_vendor.onLoad(() => {
      store.dispatch("index/getBanner");
      store.dispatch("index/getRecmdList");
      store.dispatch("index/getRecmdSong");
    });
    let songInfo = common_vendor.reactive(common_util.getSessionInfo("songInfo") || {});
    const { banner, recmdList } = common_vendor.toRefs(store.state.index);
    const recmdSongSlight = common_vendor.computed(() => {
      return store.getters["index/recmdSongSlight"];
    });
    function playMusic(id) {
      common_vendor.index.navigateTo({
        url: `/pages/play/play?id=${id}`
      });
    }
    const categories = common_vendor.reactive([
      {
        id: 1,
        classN: "recmd",
        icon: "icon-recmd",
        des: "每日推荐"
      },
      {
        id: 2,
        classN: "FM",
        icon: "icon-fm",
        des: "私人FM"
      },
      {
        id: 3,
        classN: "rank",
        icon: "icon-rank",
        des: "排行榜"
      },
      {
        id: 4,
        classN: "mlist",
        icon: "icon-list",
        des: "歌单"
      }
    ]);
    let showDrawer = common_vendor.ref(false);
    function showMore() {
      showDrawer.value = true;
    }
    function rankList() {
      common_vendor.index.navigateTo({
        url: "/pages/rank/rank?page=排行榜"
      });
    }
    function toCategory({ classN }) {
      switch (classN) {
        case "recmd":
          break;
        case "FM":
          break;
        case "rank":
          rankList();
          break;
        case "mlist":
          break;
        default:
          console.log("Error, 抛出异常");
          break;
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(showMore),
        b: common_vendor.f(common_vendor.unref(banner), (slide, index, i0) => {
          return {
            a: slide.imageUrl,
            b: index
          };
        }),
        c: common_vendor.f(categories, (cate, k0, i0) => {
          return {
            a: common_vendor.n(cate.icon),
            b: common_vendor.t(cate.des),
            c: cate.id,
            d: common_vendor.o(($event) => toCategory(cate), cate.id)
          };
        }),
        d: common_vendor.f(common_vendor.unref(recmdList), (list, k0, i0) => {
          return {
            a: list.picUrl,
            b: common_vendor.t(list.name),
            c: common_vendor.t(common_vendor.unref(common_util.getHot)([list.playCount])[0]),
            d: list.id,
            e: common_vendor.o(($event) => common_vendor.unref(common_util.goListDetail)(list.id), list.id)
          };
        }),
        e: common_vendor.f(common_vendor.unref(recmdSongSlight), (song, k0, i0) => {
          return {
            a: song.id,
            b: common_vendor.o(($event) => playMusic(song.id), song.id),
            c: "1cf27b2a-2-" + i0 + ",1cf27b2a-1",
            d: common_vendor.p({
              clickable: true,
              title: song.name,
              thumb: song.picUrl,
              thumbSize: "lg",
              note: common_vendor.unref(common_util.singer)(song.singer)
            })
          };
        }),
        f: common_vendor.p({
          border: false
        }),
        g: common_vendor.unref(songInfo)
      }, common_vendor.unref(songInfo) ? {} : {}, {
        h: common_vendor.unref(songInfo) ? 1 : ""
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "F:/WebVue/uniApp/cloudMusic/cloudMusicApp/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
