<template>
	<view class="index" :class="{indexBottom: songInfo}">
		<!-- 头部组件 由left、middle、right三部分构成-->
		<custom-header @show="isShowDrawer = !isShowDrawer" class="header">
			<!-- middle -->
			<template v-slot:middle>
				<input type="text" placeholder="我记得-赵雷">
			</template>
			<!-- right -->
			<template v-slot:right>
				<text class="iconfont icon-micphone"></text>
			</template>
		</custom-header>
		
		<!-- uni-app原生轮播图 -->
		<swiper indicator-dots="true" circular="true" class="banner">
			<swiper-item v-for="(slide, index) in banner" :key="index">
				<image :src="slide.imageUrl"></image>
			</swiper-item>
		</swiper>
		<!-- 首页类别 -->
		<view class="category">
			<view class="cat-item" v-for="cate in categories" :key="cate.id" @click="toCategory(cate)">
				<text class="iconfont" :class="cate.icon"></text>
				<text>{{ cate.des }}</text>
			</view>
		</view>
		<!-- 推荐歌单 -->
		<view class="recmdList">
			<view class="title">
				<text>推荐歌单</text>
				<text class="iconfont icon-right"></text>
			</view>
			<scroll-view scroll-x>
				<view class="list">
					<view class="list-item" v-for="list in recmdList" :key="list.id" @click="goListDetail(list.id)">
						<image :src="list.picUrl"></image>
						<text>{{ list.name }}</text>
						<text class="iconfont icon-playcount">{{ getHot([list.playCount])[0] }}</text>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 推荐歌曲 -->
		<view class="recmdSong">
			<view class="title">
				<text>推荐歌曲</text>
				<text class="iconfont icon-right"></text>
			</view>
			<view class="songlist">
				<list v-for="song in recmdSongSlight" :key="song.id" :src="song.picUrl" :title="song.name" 
				 :content="singer(song.singer)" @click.native="playMusic(song.id)"/>
			</view>
		</view>
		<!-- 抽屉 -->
		<!-- #ifndef MP-WEIXIN -->
		<drawer v-if="isShowDrawer" @hide="isShowDrawer = !isShowDrawer"/>
		<play-shortcut v-if="songInfo"></play-shortcut>
		<!-- #endif -->
	</view>
</template>

<script setup>
	import { computed, reactive, ref, toRefs } from "vue";
	import { useStore } from 'vuex';
	import { onLoad } from "@dcloudio/uni-app";
	import { getSessionInfo, singer, goListDetail, getHot } from '@/common/util.js';
	
	const store = useStore();
	
	// 发起数据派遣
	onLoad(() => {
		store.dispatch('index/getBanner');
		store.dispatch('index/getRecmdList');
		store.dispatch('index/getRecmdSong');
		// console.log("recmdSongSlight:", recmdSongSlight);
	});
	
	// 获取页面播放音乐后的session缓存 
	let songInfo = reactive(getSessionInfo('songInfo') || {});
	
	
	/* 轮播图接口数据 */
	const { banner, recmdList } = toRefs(store.state.index);
	
	/* 推荐歌曲接口数据 */
	const recmdSongSlight = computed(() => {
		return store.getters['index/recmdSongSlight'];
	});
	
	// 点击跳转歌曲播放页面
	function playMusic(id){
		uni.navigateTo({
			url: `/pages/play/play?id=${id}`
		});
	}
	
	/* 独立封装抽屉的显示与隐藏部分 */
	const categories = reactive([{
			id: 1,
			classN: "recmd",
			icon: "icon-recmd",
			des: "每日推荐"
		},
		{
			id: 2,
			classN: "FM",
			icon: "icon-fm",
			des: "私人FM"
		},
		{
			id: 3,
			classN: "rank",
			icon: "icon-rank",
			des: "排行榜"
		},
		{
			id: 4,
			classN: "mlist",
			icon: "icon-list",
			des: "歌单"
		}
	]);
	
	let isShowDrawer = ref(false);		// 为true打开抽屉
	
	/* 分类路由跳转函数 */
	function rankList() {
		uni.navigateTo({
			url: "/pages/rank/rank?page=排行榜"
		});
		// console.log(getCurrentPages());
	}
	function toCategory({ classN }) {
		switch (classN) {
			case 'recmd':
				break;
			case 'FM':
				break;
			case 'rank':
				rankList();
				break;
			case 'mlist':
				break;
			default:
				console.log("Error, 抛出异常");
				break;
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/common.scss';
	
	.index {
		@include padding(80px, 15px, 0px);
		background-color: #fff;
		
		/* #ifdef MP */
		@include padding(120px, 15px, 0px);
		/* #endif */
		
		.header {
			background-color: #fff;

			input {
				width: 70%;
				/* #ifdef MP */
				width: 95%;
				/* #endif */
				height: 30px;
				box-sizing: border-box;
				background-color: #eee;
				border-radius: 15px;
				padding-left: 15px;
				font-size: 12px;
			}
		}

		// 轮播图
		.banner {
			margin-top: 10px;
			
			image {
				width: 100%;
				height: 150px;
				border-radius: 15px;
			}
		}

		// 分类
		.category {
			display: flex;
			flex-wrap: nowrap;
			margin-top: 10px;

			.cat-item {
				flex: 1;
				/* 均分view水平空间 */
				height: 60px;
				margin: 5px;
				font-size: 14px;

				text {
					display: block;
					height: 30px;
					line-height: 30px;
					text-align: center;
				}
			}
		}

		// 推荐歌单
		.recmdList {
			margin-top: 10px;

			.title {
				margin-bottom: 10px;
			}

			.list {
				height: 168px;
				display: flex;

				.list-item {
					position: relative;
					margin: 5px;

					image {
						display: block;
						width: 120px;
						height: 120px;
						margin: auto;
						background-color: #eee;
						border-radius: 15px;
					}

					text {
						display: -webkit-box;
						box-sizing: border-box;
						width: 120px;
						height: 37px;
						text-overflow: ellipsis;
						overflow: hidden;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						padding: 3px;
						font-size: 12px;
					}
					.icon-playcount {
						position: absolute;
						left: 5px;
						top: 5px;
						color: #fff;
						width: 70px;
					}
				}
			}
		}

		.recmdSong {
			margin-top: 5px;

			.title {
				margin-bottom: 10px;
			}

			.songlist {
				padding: 0 5px;
				.list {
					padding-bottom: 5px;
					// border-bottom: #eee solid 0.5px;
				}
			}
		}
	}
	.indexBottom {
		padding-bottom: 50px;
	}
</style>