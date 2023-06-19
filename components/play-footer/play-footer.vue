<template>
	<!-- 页面底部音乐播放栏 -->
	<view class="footer">
		<view class="aboutSong">
			<text class="iconfont icon-like"></text>
			<text class="iconfont icon-downmusic"></text>
			<text class="iconfont icon-comment"></text>
			<text class="iconfont icon-share"></text>
			<!-- <text class="iconfont icon-detail"></text> -->
		</view>
		<!-- 进度条信息 -->
		<view class="pgs-container">
			<text>{{ current }}</text>
			<yui-progress class="progress" @progress="setProgress" :progress="progress"></yui-progress>
			<text>{{ duration }}</text>
		</view>
		<!-- 播放控件 -->
		<view class="controls">
			<!-- 循环方式 -->
			<view class="loop" @click="loopMode">
				<text class="iconfont" :class="loops[loopIndex]"></text>
			</view>
			<text class="iconfont icon-last" @click="lastSong"></text>
			<view class="play" @click="playOrPause">
				<text class="iconfont icon-play" v-if="play"></text>
				<text class="iconfont icon-pause" v-else></text>
			</view>
			<text class="iconfont icon-next" @click="nextSong"></text>
			<text class="iconfont icon-showlist"></text>
		</view>
	</view>
</template>

<script setup>
	import { computed, ref } from "vue";
	import { timeFormat } from '@/common/util.js'
	import { onLoad } from '@dcloudio/uni-app';

	// 父组件传递过来的数据：单曲时长
	const props = defineProps({
		time: Number
	});
	const emits = defineEmits(['resetTime']);
	const duration = computed(() => {
		return timeFormat(props.time);		
	});
	
	let current = ref('00:00');				// 当前播放时刻初始值
	let timer;												// 初始化定时器
	let progress = ref(0);						// 进度条初始值
	
	onLoad(() => {
		uni.$on('playing', (context) => {
			play.value = true;						// 将图标播放和暂停状态与音乐同步
			timer = setInterval(() => {
				current.value = timeFormat(context.currentTime * 1000 + 100);				// 已播放时间+100ms的时间差
				progress.value = context.currentTime / context.duration * 100;			// 已播放进度
			}, 1000);
		});
		uni.$on('paused', () => {
			play.value = false;
			clearInterval(timer);
		});
	});
	
	/* 设置进度：% */
	function setProgress(value){
		let realTime = value / 100 * props.time;
		emits('resetTime', realTime / 1000 + 0.06);				// 返回手动选择的时间并同步至音乐+60ms时间差
		current.value = timeFormat(realTime);							// 修改后时间
		progress.value = value;														// 修改后进度
	}
	
	/* 点击切换歌曲循环模式 */
	const loops = ['icon-loop', 'icon-singleloop', 'icon-random'];
	let loopIndex = ref(0);
	function loopMode(){
		loopIndex.value++;
		loopIndex.value %= 3;
	}
	
	/* 播放/暂停音乐播放 */
	const play = ref(false);									// 播放状态初始值：暂停播放
	function playOrPause(){
		play.value = !play.value;
		uni.$emit('playMusic', play.value);
	}
	
	/* 播放上/下一曲 */
	function lastSong(){ uni.$emit('lastSong'); }
	function nextSong(){ uni.$emit('nextSong'); }
	
</script>

<style lang="scss">
	
	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		padding: 25px;
		box-sizing: border-box;
		
		.aboutSong {
			display: flex;
			justify-content: space-around;
			align-items: center;
			margin-bottom: 20px;
			text {
				font-size: 22px;
				color: #ccc
			}
		}
		
		.pgs-container {
			/* 待处理1：封装flex布局，横纵两种形式 */
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			text {
				width: 10%;
				font-size: 12px;
				color: #ccc;
			}
			.progress {
				width: 80%;
				margin: 0 10px;
			}
		}
		
		.controls {
			display: flex;
			justify-content: space-around;
			align-items: center;
			
			margin-top: 20px;
			text {
				font-size: 24px;
				color: #ccc;
			}
			.play {
				text {
					font-size: 34px;
				}
			}
		}
	}
</style>