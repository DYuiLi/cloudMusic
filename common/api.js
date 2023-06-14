/*
 * 统一管理API请求接口
 */
import apiRequest from '@/common/request.js';

// 首页-获取首页轮播图
export const reqBanner = () => {
	return apiRequest({ url: "banner", method: "GET" });
}

// 首页-获取推荐歌单
export const reqRecmdList = () => {
	return apiRequest({ url: "personalized?limit=5", method: "GET" });
}

// 首页-获取推荐歌曲
export const reqRecmdSong = () => {
	return apiRequest({ url: "personalized/newsong?limit=5", method: "GET"});
}

// 排行榜-获取榜单推荐
export const reqRank = () => {
	return apiRequest({ url: 'toplist', method: 'GET'});
}

// 排行榜-获取排行榜歌单详情
export const reqRankList = (id) => {
	return apiRequest({url: `playlist/detail?id=${id}`, method: 'GET'});
}

// 单曲-根据Ids获取歌曲详情
export const reqSingleDetail = (ids) => {
	return apiRequest({url: `song/detail?ids=${ids}`, method: 'GET'});
}

// 歌曲-根据ID获取歌曲url
export const reqSingleUrl = (id) => {
	return apiRequest({url: `song/url?id=${id}`, method: 'GET'});
}

// 歌曲=获取单曲歌词
export const reqLyrics = (id) => {
	return apiRequest({url: `lyric?id=${id}`, method: 'GET'});
}