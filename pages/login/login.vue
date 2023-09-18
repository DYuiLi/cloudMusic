<template>
	<!-- 自定义封装列表组件(uni-list) -->
	<view class="list">
		<view class="list-head">
			<image :src="src" mode=""></image>
		</view>
		<view class="list-body">
			<text>{{ title }}</text>
			<text>{{ content }}</text>
		</view>
		<view class="list-foot" v-if="icon">
			<text class="iconfont" :class="icon"></text>
			<!-- <text> 心动模式</text> -->
		</view>
	</view>
</template>

<script setup>
	import { toRefs, computed, ref, onMounted } from 'vue';
	import { onLoad, onUnload, onInit, onReady } from '@dcloudio/uni-app';
	import { useStore} from 'vuex';
	import { getSessionInfo, timeFormat } from '@/common/util.js';
	import PlayFooter from '@/pages/play/play-footer.vue'

	const store = useStore();
	
	const audioContext = uni.createInnerAudioContext();			// 获取音频context
	audioContext.autoplay = true;														// 自动播放
	
	onLoad((option) => {
		// 获取完整歌单
		const list = store.dispatch('rank/getRankListById', option.list);
		
		// 监听暂停、播放按钮事件
		uni.$on('playMusic', (status) => {
			playOrPause(status);
		});
		
		playMusic(option.id);
		// console.log("lyric:", finalLrc);
	});
	
	/* 手动暂停/播放音乐 */
	function playOrPause(play){
		if(play){
			audioContext.play();
		}else{
			audioContext.pause();																	// H5需要用户手动开启播放
		}
	}
	// 根据手动设置进度条时间修改音乐当前播放时间点
	function resetCurrentTime(current){
		audioContext.currentTime = current;
	}
	
	/* 监听音乐播放和暂时事件 */
	audioContext.onPlay(() => {
		rotate.value = true;											// 图片旋转
		uni.$emit('playing', audioContext);
	});
	audioContext.onPause(() => {
		rotate.value = false;
		uni.$emit('paused');
	});
	
	/* 播放音乐 & 监听事件 */
	function playMusic(id){		
		// 根据id获取歌曲详情信息
		const detail = store.dispatch('rank/getSingleDetailById', id);
		// 根据id获取歌曲播放url
		const song = store.dispatch('rank/getSingleUrlById', id);
		// 根据歌曲id获取歌词
		const lyric = store.dispatch('rank/getLyricsById', id);
		
		// *** 确保异步任务接口数据有效 
		Promise.all([detail, song, lyric]).then(res => {
			// uni.$emit('update');											// 通知shortcut组件更新数据
			audioContext.src = singleUrl.value.url;			// 音频url
			uni.$on('lastSong', ()=>{switchSong(-1, id)});
			uni.$on('nextSong', ()=>{switchSong(1, id)});
		}).catch(err => {
			console.log(err);
		});
	} 
	
	/* 切换上一曲/下一曲 */
	function switchSong(index, crtID){
		const songs = tracks.value;
		let currentIndex = songs.findIndex(val => val.id == crtID) + index;
		if(currentIndex < 0) currentIndex = songs.length - 1;			// 上一曲为列表第一首
		if(currentIndex >= songs.length) currentIndex = 0;		// 当前歌曲为列表最后一首
		// console.log("audioContext", audioContext);
		
		// 移除监听，避免重复监听
		uni.$off('lastSong');
		uni.$off('nextSong');
		playMusic(songs[currentIndex].id);
	}
	
	let rotate = ref(false);			// 控制图片旋转
	
	/* 单曲信息计算属性: time, url */
	const { singleUrl, singleDetail } = toRefs(store.state.rank);
	// 歌单信息
	const tracks = computed(() => {
		return store.getters['rank/listTracks'];
	});
	
	// const doms = {};
	
	let lrcHeight, containerHeight, textHeight, maxOffset;					// DOM元素高度和最大偏移量
	
	
	/*onMounted(() => {		
		
		// 获取DOM元素对象
		doms.lrcObj = uni.createSelectorQuery().in(this).select('.lyrics');
		doms.ctnrObj = uni.createSelectorQuery().in(this).select('.container');
		doms.textObj = uni.createSelectorQuery().in(this).select('.text');
		
		// let lrcHeight, containerHeight, textHeight, maxOffset;
		doms.lrcObj.boundingClientRect(e => {
			lrcHeight = e.height;
		}).exec();
		doms.ctnrObj.boundingClientRect(e => {
			containerHeight = e.height;
		}).exec();
		doms.textObj.boundingClientRect(e => {
			textHeight = e.height;
		}).exec();
		maxOffset = containerHeight - lrcHeight;
		
		// 当前歌曲播放进度监听
		audioContext.onTimeUpdate(() => {
			lyricIndex.value = getIndex();
			let offset= textHeight * lyricIndex.value + textHeight/2 - lrcHeight/2
			if(offset < 0) offset = 0;
			if(offset > maxOffset) offset = maxOffset;
			doms.ctnrObj[0].style.transform = `translateY(-${offset}px)`;
			
			// 当前歌曲播放结束，自动切换下一首
			if(audioContext.currentTime == audioContext.duration) switchSong(1, getSessionInfo('songInfo').id);
		});
	});*/
	
	/* 歌词滚动-播放进度更新事件 */	
	const doms = {
		lrcObj: document.getElementsByClassName('lyrics'),
		ctnrObj: document.getElementsByClassName('container')
		// lrcObj: uni.createSelectorQuery().select('.lyrics'),
		// ctnrObj: uni.createSelectorQuery().select('.container')
	}
	
	setTimeout(() => {		
		lrcHeight = doms.lrcObj[0].clientHeight;
		containerHeight = doms.ctnrObj[0].clientHeight;
		textHeight = doms.ctnrObj[0].children[0].clientHeight;
		maxOffset = containerHeight - lrcHeight;
	}, 1000);
	
	let lyricIndex = ref(0);
	
	// 获取当前滚动选中的歌词序列
	function getIndex() {
		for(let i=0; i<finalLrc.value.length-1; i++){
			if(finalLrc.value[i].time > audioContext.currentTime){
				 return i-1;
			}
		}
		// 当没找到符合条件的i，表示改行为最后一句
		return finalLrc.value.length - 1;
	}
	// 当前歌曲播放进度监听
	audioContext.onTimeUpdate(() => {
		lyricIndex.value = getIndex();
		let offset= textHeight * lyricIndex.value + textHeight/2 - lrcHeight/2
		if(offset < 0) offset = 0;
		if(offset > maxOffset) offset = maxOffset;
		doms.ctnrObj[0].style.transform = `translateY(-${offset}px)`;
		
		// 当前歌曲播放结束，自动切换下一首
		if(audioContext.currentTime == audioContext.duration) switchSong(1, getSessionInfo('songInfo').id);
	});
	
	/* 接口返回的初始歌词信息, 对歌词进行拆分 */
	const lyric = computed(() => { return store.state.rank.singleLyrics; });
	// 拆分后的歌词
	let finalLrc = computed(() => {
		const pattern = /\[([^\]]+)\]([^\[]+)/g;			// 正则模板，提取单句歌词
		let final = [];
		// 其中$0表示符合pattern的子表达式，$1表示子表达式匹配([^\]]+)的内容，$2表示子表达式匹配([^\[]+)的内容
		lyric.value.replace(pattern, ($0, $1, $2) => {
			final.push({
				time: timeFormat($1),
				lyric: $2
			});
		});
		return final;
	});
	
	/* 切换歌词页面展示歌词 */
	let show = ref(true);
	function showLyrics(){
		show.value = !show.value;
	}
	
	onUnload(() => {
		uni.$off('playMusic');			// 页面出栈时取消监听
		audioContext.destroy();			// 撤销音乐媒体context
	});
</script>

<style lang="scss" scoped>
	%head {
		padding-top: 3px;

		image {
			width: 40px;
			height: 40px;
			margin-right: 10px;
			border-radius: 10px;
		}
	}

	%body {
		flex: 1;

		text {
			font-size: 14px;
			height: 22px;
			line-height: 22px;
			display: block;

			&:last-child {
				font-size: 12px;
				color: #666;
			}
		}
	}

	%foot {
		padding: 0 5px 5px;
		border: #ddd solid 0.5px;
		border-radius: 15px;

		text {
			font-size: 12px;
			color: #333;
			vertical-align: middle;

			&:first-child {
				font-size: 16px;
			}
		}
	}

	.list {
		display: flex;
		align-items: center;
		margin-top: 15px;
		height: 44px;
		background-color: #fff;
		border-radius: 15px;
		box-shadow: #ddd 0 0 5px;
		padding: 15px;

		&-head {
			@extend %head;
		}

		&-body {
			@extend %body;
		}

		&-foot {
			@extend %foot;
		}
	}
</style>