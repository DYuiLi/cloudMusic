"use strict";
const common_vendor = require("../../common/vendor.js");
const common_util = require("../../common/util.js");
if (!Array) {
  const _easycom_rank_header2 = common_vendor.resolveComponent("rank-header");
  _easycom_rank_header2();
}
const _easycom_rank_header = () => "../../components/rank-header/rank-header.js";
if (!Math) {
  (_easycom_rank_header + PlayFooter)();
}
const PlayFooter = () => "./play-footer.js";
const _sfc_main = {
  __name: "play",
  setup(__props) {
    const store = common_vendor.useStore();
    const audioContext = common_vendor.index.createInnerAudioContext();
    audioContext.autoplay = true;
    common_vendor.onLoad((option) => {
      store.dispatch("rank/getRankListById", option.list);
      common_vendor.index.$on("playMusic", (status) => {
        playOrPause(status);
      });
      playMusic(option.id);
    });
    function playOrPause(play) {
      if (play) {
        audioContext.play();
      } else {
        audioContext.pause();
      }
    }
    function resetCurrentTime(current) {
      audioContext.currentTime = current;
    }
    audioContext.onPlay(() => {
      rotate.value = true;
      common_vendor.index.$emit("playing", audioContext);
    });
    audioContext.onPause(() => {
      rotate.value = false;
      common_vendor.index.$emit("paused");
    });
    function playMusic(id) {
      const detail = store.dispatch("rank/getSingleDetailById", id);
      const song = store.dispatch("rank/getSingleUrlById", id);
      const lyric2 = store.dispatch("rank/getLyricsById", id);
      Promise.all([detail, song, lyric2]).then((res) => {
        audioContext.src = singleUrl.value.url;
        common_vendor.index.$on("lastSong", () => {
          switchSong(-1, id);
        });
        common_vendor.index.$on("nextSong", () => {
          switchSong(1, id);
        });
      }).catch((err) => {
        console.log(err);
      });
    }
    function switchSong(index, crtID) {
      const songs = tracks.value;
      let currentIndex = songs.findIndex((val) => val.id == crtID) + index;
      if (currentIndex < 0)
        currentIndex = songs.length - 1;
      if (currentIndex >= songs.length)
        currentIndex = 0;
      common_vendor.index.$off("lastSong");
      common_vendor.index.$off("nextSong");
      playMusic(songs[currentIndex].id);
    }
    let rotate = common_vendor.ref(false);
    const { singleUrl, singleDetail } = common_vendor.toRefs(store.state.rank);
    const tracks = common_vendor.computed(() => {
      return store.getters["rank/listTracks"];
    });
    const doms = {};
    let lrcHeight, containerHeight, textHeight, maxOffset;
    common_vendor.onMounted(() => {
      doms.lrcObj = common_vendor.index.createSelectorQuery().in(this).select(".lyrics");
      doms.ctnrObj = common_vendor.index.createSelectorQuery().in(this).select(".container");
      doms.textObj = common_vendor.index.createSelectorQuery().in(this).select(".text");
      doms.lrcObj.boundingClientRect((e) => {
        lrcHeight = e.height;
      }).exec();
      doms.ctnrObj.boundingClientRect((e) => {
        containerHeight = e.height;
      }).exec();
      doms.textObj.boundingClientRect((e) => {
        textHeight = e.height;
      }).exec();
      maxOffset = containerHeight - lrcHeight;
    });
    let lyricIndex = common_vendor.ref(0);
    function getIndex() {
      for (let i = 0; i < finalLrc.value.length - 1; i++) {
        if (finalLrc.value[i].time > audioContext.currentTime) {
          return i - 1;
        }
      }
      return finalLrc.value.length - 1;
    }
    audioContext.onTimeUpdate(() => {
      lyricIndex.value = getIndex();
      let offset = textHeight * lyricIndex.value + textHeight / 2 - lrcHeight / 2;
      if (offset < 0)
        offset = 0;
      if (offset > maxOffset)
        offset = maxOffset;
      doms.ctnrObj[0].style.transform = `translateY(-${offset}px)`;
      if (audioContext.currentTime == audioContext.duration)
        switchSong(1, common_util.getSessionInfo("songInfo").id);
    });
    const lyric = common_vendor.computed(() => {
      return store.state.rank.singleLyrics;
    });
    let finalLrc = common_vendor.computed(() => {
      const pattern = /\[([^\]]+)\]([^\[]+)/g;
      let final = [];
      lyric.value.replace(pattern, ($0, $1, $2) => {
        final.push({
          time: common_util.timeFormat($1),
          lyric: $2
        });
      });
      return final;
    });
    let show = common_vendor.ref(true);
    function showLyrics() {
      show.value = !show.value;
    }
    common_vendor.onUnload(() => {
      common_vendor.index.$off("playMusic");
      audioContext.destroy();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: `url(${common_vendor.unref(singleDetail).picUrl})`,
        b: common_vendor.p({
          pageName: {
            name: common_vendor.unref(singleDetail).name,
            singer: common_vendor.unref(singleDetail).singer
          }
        }),
        c: common_vendor.unref(show)
      }, common_vendor.unref(show) ? {
        d: common_vendor.unref(singleDetail).picUrl,
        e: common_vendor.unref(rotate) ? 1 : "",
        f: common_vendor.f(common_vendor.unref(finalLrc), (lrc, index, i0) => {
          return {
            a: common_vendor.t(lrc.lyric),
            b: index,
            c: common_vendor.unref(lyricIndex) === index ? 1 : ""
          };
        }),
        g: common_vendor.o(showLyrics)
      } : common_vendor.e({
        h: doms.ctnrObj
      }, doms.ctnrObj ? {
        i: common_vendor.f(common_vendor.unref(finalLrc), (ly, index, i0) => {
          return {
            a: common_vendor.t(ly.lyric),
            b: index
          };
        }),
        j: common_vendor.o(showLyrics)
      } : {}), {
        k: common_vendor.t(_ctx.ly.a),
        l: _ctx.ly.b,
        m: common_vendor.o((...args) => _ctx.j && _ctx.j(...args)),
        n: common_vendor.o(resetCurrentTime),
        o: common_vendor.p({
          time: common_vendor.unref(singleUrl).time
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/UniApp/cloudMusic/cloudMusicApp/pages/play/play.vue"]]);
wx.createPage(MiniProgramPage);
