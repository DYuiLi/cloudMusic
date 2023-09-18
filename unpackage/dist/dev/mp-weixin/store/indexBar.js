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
      } else {
        return Promise.reject(new Error(res.message));
      }
    },
    // 首页-推荐歌单
    getRecmdList: async function({ commit }) {
      let res = await common_api.reqRecmdList();
      if (res.code === 200) {
        commit("GETRECMDLIST", res.result);
      } else {
        return Promise.reject(new Error(res.message));
      }
    },
    // 首页-推荐歌曲
    getRecmdSong: async function({ commit }) {
      let res = await common_api.reqRecmdSong();
      if (res.code == 200) {
        commit("GETRECMDSONG", res.result);
      } else {
        return Promise.reject(new Error(res.message));
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
    // 处理推荐歌曲，将歌曲对应的多个歌手进行拼接
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
