"use strict";
const common_api = require("../common/api.js");
const common_util = require("../common/util.js");
const rank = {
  namespaced: true,
  state: {
    allRanks: [],
    // 所有排行榜信息
    rankList: [],
    // 单个排行榜歌单
    singleUrl: {},
    // 单曲Url播放信息
    singleDetail: {},
    // 单曲详情
    singleLyrics: ""
    // 歌词
  },
  actions: {
    // 获取所有榜单
    getAllRank: async function({ commit }) {
      let res = await common_api.reqRank();
      if (res.code === 200) {
        commit("GETALLRANKS", res.list);
      } else {
        return Promise.reject(new Error(res.message));
      }
    },
    // 获取具体榜单详情
    getRankListById: async function({ commit }, rankID) {
      let res = await common_api.reqRankList(rankID);
      if (res.code === 200) {
        commit("GETRANKLISTBYID", res.playlist);
      } else {
        return Promise.reject(new Error(res.message));
      }
    },
    // 获取单曲详情：name, singer, picUrl
    getSingleDetailById: async function({ commit }, songIDs) {
      let res = await common_api.reqSingleDetail(songIDs);
      if (res.code === 200) {
        commit("GETSINGLEDETAILBYID", res.songs[0]);
      } else {
        return Promise.reject(new Error(res.message));
      }
    },
    // 获取单曲Url
    getSingleUrlById: async function({ commit }, songID) {
      let res = await common_api.reqSingleUrl(songID);
      if (res.code === 200) {
        commit("GETSINGLEURLBYID", res.data[0]);
      } else {
        return Promise.reject(new Error(res.message));
      }
    },
    // 获取单曲歌词
    getLyricsById: async function({ commit }, songID) {
      let res = await common_api.reqLyrics(songID);
      if (res.code === 200) {
        commit("GETLYRICSBYID", res.lrc);
      } else {
        return Promise.reject(new Error(res.message));
      }
    }
  },
  mutations: {
    // 所有榜单数据
    GETALLRANKS: function(state, lists) {
      state.allRanks = lists;
    },
    // 根据榜单ID获取榜单歌曲信息
    GETRANKLISTBYID: function(state, songs) {
      state.rankList = songs;
      state.allRanks.forEach((item) => {
        if (item.id === songs.id) {
          item.tracks = songs.tracks.slice(0, 3);
        }
      });
    },
    // 提交单曲Url
    GETSINGLEURLBYID: function(state, single) {
      common_util.setSessionInfo("songUrl", single.url);
      state.singleUrl = single;
    },
    // 提交单曲详情
    GETSINGLEDETAILBYID: function(state, detail) {
      const songInfo = {
        name: detail.name,
        singer: common_util.singer(detail.ar),
        picUrl: detail.al.picUrl,
        id: detail.id
      };
      common_util.setSessionInfo("songInfo", songInfo);
      state.singleDetail = songInfo;
    },
    // 歌词
    GETLYRICSBYID: function(state, lrc) {
      state.singleLyrics = lrc.lyric;
    }
  },
  getters: {
    // 榜单推荐
    offRank: (state) => {
      return state.allRanks.slice(0, 4) || [];
    },
    // 官方榜
    recmdRank: (state) => {
      return state.allRanks.slice(4, 7) || [];
    },
    // 榜单列表来源(头像)
    rankListAvatar: (state) => {
      return state.rankList.creator || {};
    },
    listTracks: (state) => {
      return state.rankList.tracks || [];
    }
  }
};
exports.rank = rank;
