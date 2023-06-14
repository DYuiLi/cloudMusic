/*
 * 首页数据仓库
 */
import { reqBanner, reqRecmdList, reqRecmdSong } from "@/common/api.js"

export default {
	namespaced: true,
	state: {
		banner: [],
		recmdList: [],
		recmdSong: []
	},
	actions: {
		// 首页-轮播图
		getBanner: async function({commit}){
			let res = await reqBanner();
			if(res.code == 200){
				commit('GETBANNER', res.banners);
				// console.log('banner:', res.banners);
			}else{
				
			}
		},
		// 首页-推荐歌单
		getRecmdList: async function({commit}){
			let res = await reqRecmdList();
			// console.log(result);
			if(res.code === 200){
				commit('GETRECMDLIST', res.result);
			}else{
				
			}
		},
		// 首页-推荐歌曲
		getRecmdSong: async function({commit}){
			let res = await reqRecmdSong();
			if(res.code == 200 ){
				commit('GETRECMDSONG', res.result);
			}else {
				
			}
		}
	},
	mutations: {
		// 首页-轮播图
		GETBANNER: function(state, bannerArr){
			state.banner = bannerArr;
		},
		// 首页-推荐歌单
		GETRECMDLIST: function(state, recmdListArr){
			state.recmdList = recmdListArr;
		},
		// 首页-推荐歌曲
		GETRECMDSONG: function(state, recmdSongArr){
			state.recmdSong = recmdSongArr;
		}
	},
	getters: {
		recmdSongSlight: state => {
			return state.recmdSong.map( val => {
				return {
					id: val.id, 
					picUrl: val.picUrl,
					name: val.name,
					singer: val.song.artists.map(item => {
						return item.name;
					})
				}
			});
		}
	}
}