/* * 排行榜数据仓库 */
import { reqLyrics, reqRank, reqRankList, reqSingleDetail, reqSingleUrl } from '@/common/api.js'
import { singer, removeSessionInfo, setSessionInfo } from '@/common/util.js'

export default {
	namespaced: true,
	state: {
		allRanks: [],									// 所有排行榜信息
		rankList: [],									// 单个排行榜歌单
		singleUrl: {},								// 单曲Url播放信息
		singleDetail: {},							// 单曲详情
		singleLyrics: ""							// 歌词
	},
	actions: {
		// 获取所有榜单
		getAllRank: async function({commit}) {
			let res = await reqRank();
			// console.log("all rank List: ", res);
			if(res.code === 200){
				commit('GETALLRANKS', res.list);
			}else{
				return Promise.reject(new Error(res.message));
			}
		},
		// 获取具体榜单详情
		getRankListById: async function({commit}, rankID) {
			let res = await reqRankList(rankID);
			// console.log("rank List: ", res);
			if(res.code === 200){
				commit('GETRANKLISTBYID', res.playlist);
			}else{
				return Promise.reject(new Error(res.message));
			}
		},
		// 获取单曲详情：name, singer, picUrl
		getSingleDetailById: async function({commit}, songIDs){
			let res = await reqSingleDetail(songIDs);
			// console.log("getSingleDetailById: ", res.songs[0]);
			if(res.code === 200){
				commit('GETSINGLEDETAILBYID', res.songs[0]);
			}else{
				return Promise.reject(new Error(res.message));
			}
		},
		// 获取单曲Url
		getSingleUrlById: async function({commit}, songID) {
			let res = await reqSingleUrl(songID);
			// console.log("getSingleUrlById", res.data[0]);
			if(res.code === 200){
				commit('GETSINGLEURLBYID', res.data[0]);
			}else{
				return Promise.reject(new Error(res.message));
			}
		},
		// 获取单曲歌词
		getLyricsById: async function({commit}, songID) {
			let res = await reqLyrics(songID);
			// console.log("getLyricsById", res.lrc.lyric);
			if(res.code === 200) {
				commit('GETLYRICSBYID', res.lrc);
			}else {
				return Promise.reject(new Error(res.message));
			}
		}
	},
	mutations: {
		// 所有榜单数据
		GETALLRANKS: function(state, lists){
			state.allRanks = lists;
		},
		// 根据榜单ID获取榜单歌曲信息
		GETRANKLISTBYID: function(state, songs){
			// 根据歌单ID返回的原始歌单数据
			state.rankList = songs;
			// 将该歌单的歌曲加入allRanks中(前三首)
			state.allRanks.forEach(item => {
				if(item.id === songs.id){
					item.tracks = songs.tracks.slice(0, 3);
				}
			});
		},
		// 提交单曲Url
		GETSINGLEURLBYID: function(state, single){
			// console.log(single.url);
			setSessionInfo('songUrl', single.url)
			// sessionStorage.setItem('songUrl', single.url);
			state.singleUrl = single;
		},
		// 提交单曲详情
		GETSINGLEDETAILBYID: function(state, detail){
			// console.log("GETSINGLEDETAILBYID", detail);
			const songInfo = {
				name: detail.name,
				singer: singer(detail.ar),
				picUrl: detail.al.picUrl,
				id: detail.id
			}
			// console.log("session Storage songInfo:", songInfo);
			// 封面图片存储在sessionStorage中，避免页面获取深层次数据渲染时失败报错
			// setSingleInfo(songInfo);
			setSessionInfo('songInfo', songInfo);
			state.singleDetail = songInfo;
		},
		// 歌词
		GETLYRICSBYID: function(state, lrc){
			// console.log("GETLYRICSBYID", lrc);
			state.singleLyrics = lrc.lyric;
		}
	},
	getters: {
		// 榜单推荐
		offRank: state => {
			// 当网络较差，请求数据未准备好，返回一个空数组以保持结构
			return state.allRanks.slice(0, 4) || [];
		},
		// 官方榜
		recmdRank: state => {
			return state.allRanks.slice(4, 7) || [];
		},
		// 榜单列表来源(头像)
		rankListAvatar: state => {
			return state.rankList.creator || {};
		},
		listTracks: state => {
			return state.rankList.tracks || [];
		}
	}
}