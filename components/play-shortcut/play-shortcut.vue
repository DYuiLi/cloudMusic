<template>
	<!-- 页面底部音乐播放栏 -->
	<view class="shortcut" :class="{bottom: bottom}" v-if="picUrl">
		<view class="music">
			<image :src="picUrl"></image>
		</view>
		<text class="song-name" @click="toPlayPage">{{ name }} - {{ singer }}</text>
		<view @click="swiftButton">
			<!-- class="play-button" -->
			<text class="iconfont icon-play" v-if="play"></text>
			<text class="iconfont icon-pause" v-else></text>
		</view>
		<text class="iconfont icon-showlist"></text>
	</view>
</template>

<script setup>
import { reactive, ref } from "vue";
import { getSessionInfo } from "@/common/util.js";

	// 获取缓存歌曲信息
	const { picUrl, name, singer, id } = reactive(getSessionInfo('songInfo') || {});
	
	const pages = getCurrentPages();
	const currentPage = pages[pages.length - 1].route;
	// 导航栏页面
	const bars = ['pages/index/index', 'pages/my/my', 'pages/login/login'];
	let bottom = bars.includes(currentPage);
	
	/* 修改播放状态切换 */
	let play = ref(true);
	function swiftButton(){
		play.value = !play.value;
	}
	/* 跳转播放界面 */
	function toPlayPage(){
		uni.navigateTo({
			url: `/pages/play/play?id=${id}`
		});
	}
	
</script>

<style lang="scss">
	.shortcut {
		display: flex;
		align-items: center;
		justify-content: space-between;

		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 50px;

		background-color: #fff;
		box-shadow: #ddd 0 0 5px;
		padding: 0 15px;
		
		.music {
			width: 40px;
			position: relative;
			
			image {
				position: absolute;
				left: -5px;
				bottom: -19px;
				width: 50px;
				height: 50px;
				box-shadow: #666 0 0 5px;
				border-radius: 50%;
			}
		}

		text {
			color: #666;
		}
		.icon-play,
		.icon-pause {
			font-size: 28px;
		}
		.icon-showlist {
			font-size: 22px;
			font-weight: 600;
		}
		
		.song-name {
			display: inline-block;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			width: 200px;
			font-size: 14px;
		}
	}
	// 将底部播放栏移至tabBar上
	.bottom {
		bottom: 50px
	}
</style>