/*
 * 定义全局变量 & 封装公共函数
 */
import { reactive, ref } from 'vue';


/* 展示/隐藏抽屉 */
export let drawerFlag = ref(false);
// 显示抽屉函数
export function showMore() {
	drawerFlag.value = true;
}
// 隐藏抽屉函数
export function hideDrawer() {
	drawerFlag.value = false;
}

/* 设置/获取/移除浏览器sessionStorage信息 */
export function setSessionInfo(item, value){
	
	sessionStorage.setItem(item, JSON.stringify(value));
	
	// #ifdef MP-WEIXIN
	console.log(item, value);
	wx.setStorage({
		key: item,
		data: value
	});
	// #endif
}

export function getSessionInfo(item) {
	
	// #ifdef MP-WEIXIN
	return wx.getStorage({key:item});
	// #endif
	
	return JSON.parse(sessionStorage.getItem(item));   // 'songInfo'
}

export function removeSessionInfo(item) {
	
	// #ifdef MP-WEIXIN
	wx.removeStorage({key:item});
	// #endif
	
	sessionStorage.removeItem(item);
}

/* 拼接歌手 */
export function singer(list) {

	let singer;

	if (list[0].name) {
		// 当传入的歌手列表格式为[{name: "xxx"}, {name: "xxx"}]
		singer = list[0].name;
		for (let i = 1; i < list.length; i++) {
			singer = singer + '/' + list[i].name;
		}
	} else {
		// 传入的歌手列表格式为["xxx","xxx"]
		singer = list[0];
		for (let i = 1; i < list.length; i++) {
			singer = singer + '/' + list[i];
		}
	}
	return singer;
}

/* 将毫秒转换成分秒 */
export function timeFormat(time) {
	
	if(time && typeof(time) === 'string'){
		// 通过拆分歌词得到的时间
		time = time.replace(':', '.');
		time = time.split('.');
		return time[0] * 60 + time[1] * 1 + time[2] / 1000;
		
	}else if(time){
		// 通过单曲url得到的以ms为单位的时间
		time = parseInt(time / 1000);
		const min = parseInt(time / 60);
		const seconds = time % 60;
		// 当分秒小于10，补齐0
		return seconds < 10 ? '0' + min + ':0' + seconds : '0' + min + ':' + seconds;
	}else{
		return '00:00';
	}
}

/* 歌词滚动 */
export function lyricsRolling(){
	
}

/* 跳转榜单详情页面 */
export function goListDetail(id){
	uni.navigateTo({
		url: `/pages/rank-list-deail/rank-list-deail?id=${id}`
	});
}

/* 计算歌单热度 */
export function getHot(data){
	// if(!data.length) return []
	return data.map(num => {
		if( num > 99999999 ){
			return (num/100000000).toFixed(1) + '亿';
		}else if( num > 9999 ){
			return (num/10000).toFixed(1) + '万';
		}else{
			return num + '';
		}
	});
}