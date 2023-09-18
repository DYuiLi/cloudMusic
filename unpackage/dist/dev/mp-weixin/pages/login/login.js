"use strict";
const common_vendor = require("../../common/vendor.js");
const common_util = require("../../common/util.js");
const _sfc_main = {
  __name: "login",
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
    let lrcHeight, containerHeight, textHeight, maxOffset;
    const doms = {
      lrcObj: document.getElementsByClassName("lyrics"),
      ctnrObj: document.getElementsByClassName("container")
      // lrcObj: uni.createSelectorQuery().select('.lyrics'),
      // ctnrObj: uni.createSelectorQuery().select('.container')
    };
    setTimeout(() => {
      lrcHeight = doms.lrcObj[0].clientHeight;
      containerHeight = doms.ctnrObj[0].clientHeight;
      textHeight = doms.ctnrObj[0].children[0].clientHeight;
      maxOffset = containerHeight - lrcHeight;
    }, 1e3);
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
    common_vendor.ref(true);
    common_vendor.onUnload(() => {
      common_vendor.index.$off("playMusic");
      audioContext.destroy();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: _ctx.src,
        b: common_vendor.t(_ctx.title),
        c: common_vendor.t(_ctx.content),
        d: _ctx.icon
      }, _ctx.icon ? {
        e: common_vendor.n(_ctx.icon)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4e4508d"], ["__file", "E:/UniApp/cloudMusic/cloudMusicApp/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
