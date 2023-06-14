<template>
	<!-- 模糊背景 -->
	<view>
		<view class="blurbg" :style="{backgroundImage: `url(${singleDetail.picUrl})`}"></view>
		<rank-header :pageName="{name:singleDetail.name, singer: singleDetail.singer}" class="header"></rank-header>
		<view class="content">
			<!-- 显示播放封面 -->
			<view class="bgimage" v-if="show">
				<image :src="singleDetail.picUrl" :class="{playing: rotate}"></image>
				<!-- 封面歌词-滚动效果 -->
				<view class="lyrics" @click="showLyrics" >
					<view class="container">
						<text v-for="(lrc, index) in finalLrc" :key="index" :class="{active: lyricIndex === index}" >{{ lrc.lyric }}</text>
					</view> 
				</view>
			</view>
			<!-- 显示歌词 -->
			<view class="fulllyrics" v-else @click="showLyrics">
				<text v-for="(ly, index) in finalLrc" :key="index">{{ly.lyric}}</text>
				<!-- <view class="container">   歌词滚动
					<text v-for="(ly, index) in finalLrc" :key="index" :class="{active: lyricIndex === index}">{{ly.lyric}}</text>
				</view> -->
			</view>
		</view>
		<play-footer :time="singleUrl.time" @resetTime="resetCurrentTime"></play-footer>
	</view>
</template>

<script setup>
	import { toRefs, toRef, computed, ref, reactive, onMounted, provide } from 'vue';
	import { onLoad, onUnload, onReady } from '@dcloudio/uni-app';
	import { useStore} from 'vuex';
	import { timeFormat } from '@/common/util.js';

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
	
	/* 监听音乐播放和暂时事件 */
	audioContext.onPlay(() => {
		rotate.value = true;											// 图片旋转
		uni.$emit('playing', audioContext);
	});
	audioContext.onPause(() => {
		rotate.value = false;
		uni.$emit('paused');
	});
	
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
	
	/* 歌词滚动-播放进度更新事件 */	
	const doms = {
		lrcObj: document.getElementsByClassName('lyrics'),
		ctnrObj: document.getElementsByClassName('container')
	}
	
	let lrcHeight, containerHeight, textHeight, maxOffset;					// DOM元素高度和最大偏移量
	
	setTimeout(() => {
		lrcHeight = doms.lrcObj[0].clientHeight;
		containerHeight = doms.ctnrObj[0].clientHeight;
		textHeight = doms.ctnrObj[0].children[0].clientHeight;
		maxOffset = containerHeight - lrcHeight;
	}, 1000);
	
	let lyricIndex = ref(0);
	
	audioContext.onTimeUpdate(() => {
		lyricIndex.value = getIndex();
		let offset= textHeight * lyricIndex.value + textHeight/2 - lrcHeight/2
		if(offset < 0) offset = 0;
		if(offset > maxOffset) offset = maxOffset;
		doms.ctnrObj[0].style.transform = `translateY(-${offset}px)`;
	});
	// 获取当前滚动选中的歌词序列
	function getIndex() {
		const currentTime = audioContext.currentTime;
		for(let i=0; i<finalLrc.value.length-1; i++){
			if(finalLrc.value[i].time > currentTime){
				 return i-1 ;
			};
		}
		// 当没找到符合条件的i，表示改行为最后一句
		return finalLrc.value.length - 1;
	}
	
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

<style lang="scss">
	/* 模糊背景 */
	.blurbg {
		position: fixed;
		padding: 50px 0;
		width: 100%;
		height: 570px;
		background-size: cover;
		background-position: center 0;
		filter: blur(30px);
		scale: (1.2);						// 去掉毛玻璃产生的白边
	}
	.header {
		border: none;			// 去除custom-header默认边框样式
		color: #fff;
	}
	.content {
		padding: 80px 25px 0;
		.bgimage {
			position: relative;
			height: 100%;
			image {
				position: absolute;
				top: 120px;
				left: 50%;
				width: 180px;
				translate: -50% -50%;
				height: 180px;
				border-radius: 50%;
				border: #333 solid 20px;
				border-width: 25px;
				margin-top: 10px;
				animation: 20s infinite rotate linear;
				animation-play-state: paused;						// 默认不旋转(音乐暂停)
			}
			
			@keyframes rotate {
				from {
					transform: rotate(0deg);
				}
				to {
					transform: rotate(360deg);
				}
			}
			
			.playing {
				animation-play-state: running;
			}
			
			.lyrics {
				position: absolute;
				top: 280px;
				width: 100%;
				height: 120px;					// 需要通过JS计算设备屏幕高度和比例进而调整显示歌词的高度
				// height: 50%;	
				overflow: hidden;
				text-align: center;
				
				.container {			/* 控制歌词滚动 */
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-around;
					transition: 0.5s;
					
					text  {
						width: 100%;
						height: 35px;
						font-size: 14px;
						font-weight: 600;
						color: #666;
					}
					.active {
						font-size: 16px;
						color: #eee;
						// margin: 10px 0;
					}
				}
			}
		}
		.fulllyrics {
			display: flex;
			flex-direction: column;
			align-items: center;
			text-align: center;
			position: relative;
			height: 450px;
			overflow: scroll;		
			
			text {
				color: #fff;
				font-size: 14px;
				margin: 5px 0;
			}
		}
	}
</style>
