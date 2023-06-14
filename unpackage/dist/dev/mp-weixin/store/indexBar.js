"use strict";
const common_api = require("../common/api.js");
const index = {
  namespaced: true,
  state: {
    banner: [],
    recmdList: [],
    recmdSong: []
  },
  actions: {
    // 首页-轮播图
    getBanner: async function({ commit }) {
      let res = await common_api.reqBanner();
      if (res.code == 200) {
        commit("GETBANNER", res.banners);
      }
    },
    // 首页-推荐歌单
    getRecmdList: async function({ commit }) {
      let res = await common_api.reqRecmdList();
      if (res.code === 200) {
        commit("GETRECMDLIST", res.result);
      }
    },
    // 首页-推荐歌曲
    getRecmdSong: async function({ commit }) {
      let res = await common_api.reqRecmdSong();
      if (res.code == 200) {
        commit("GETRECMDSONG", res.result);
      }
    }
  },
  mutations: {
    // 首页-轮播图
    GETBANNER: function(state, bannerArr) {
      state.banner = bannerArr;
    },
    // 首页-推荐歌单
    GETRECMDLIST: function(state, recmdListArr) {
      state.recmdList = recmdListArr;
    },
    // 首页-推荐歌曲
    GETRECMDSONG: function(state, recmdSongArr) {
      state.recmdSong = recmdSongArr;
    }
  },
  getters: {
    recmdSongSlight: (state) => {
      return state.recmdSong.map((val) => {
        return {
          id: val.id,
          picUrl: val.picUrl,
          name: val.name,
          singer: val.song.artists.map((item) => {
            return item.name;
          })
        };
      });
    }
  }
};
exports.index = index;
