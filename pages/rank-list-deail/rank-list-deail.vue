<template>
	<!-- :style="backgroundImage: `url(${})`" -->
	<view class="list-detail" :style="{backgroundImage: `url(${rankList.coverImgUrl})`}">
		<!-- 页面头部组件 -->
		<rank-header class="header" :opacity="opacity" :pageName="{name:rankList.name}"></rank-header>
		<!-- 歌单背景及描述 -->
		<view class="bg-cover">
			<image :src="rankList.coverImgUrl"></image>
			<view class="description">
				<view class="source">
					<image :src="listAvatar.avatarUrl"></image>
					<text>{{ listAvatar.nickname }}</text>
				</view>
				<text class="des">{{ rankList.description}}</text>
			</view>
		</view>
		<!-- 收藏、分享、评论数量 -->
		<view class="hot">
			<text class="iconfont icon-collect">{{ hot[0] }}</text>
			<text class="iconfont icon-comment">{{ hot[1] }}</text>
			<text class="iconfont icon-share"> {{ hot[2] }}</text>
		</view>
		<!-- 单曲展示 -->
		<view class="list">
			<view class="all">
				<view class="play-all">
					<text class="iconfont icon-playall"></text>
					<text class="word">播放全部</text>
					<text class="total">({{ songs.length }}首)</text>
				</view>
				
				<text class="iconfont icon-downmusic"></text>
				<text class="iconfont icon-select"></text>
			</view>
			<view class="songs" v-for="(song, index) in songs" :key="song.id" @click="playMusic(song.id)">
				<text>{{index + 1 }}</text>
				<view class="song-info">
					<text>{{ song.name }}</text>
					<text>{{ singer(song.ar) }}</text>
				</view>
				<view class="mv">
					<text v-show="song.mv" class="iconfont icon-mv"></text>
				</view>
				<text class="iconfont icon-detail"></text>
			</view>
		</view>
		<play-shortcut></play-shortcut>
	</view>
</template>

<script setup>
	import { onLoad } from '@dcloudio/uni-app';
	import { useStore } from 'vuex';
	import { computed, getCurrentInstance, onMounted, ref, toRefs } from "vue";
	import { singer, goListDetail, getHot } from '@/common/util.js'	
	
	const store = useStore();
	
	onLoad((option) => {
		store.dispatch('rank/getRankListById', option.id);
		// console.log("songs:", rankList.value.id);
	});
	
	/* 获取歌单热度：收藏、评论、分享数量 */
	const hot = computed(() => {
		const data = rankList.value;
		return getHot([data.subscribedCount, data.commentCount, data.shareCount]);
	});
	
	/* 设置头部并经颜色透明度 */
	const opacity = ref(0);
	onMounted(() => {
		window.addEventListener('scroll', ()=> {
			opacity.value = document.documentElement.scrollTop / 200;
			if(opacity.value > 1) opacity.value = 1;
		}, true);
	})
	
	/* 根据歌单ID获取歌曲信息 */
	const { rankList } = toRefs(store.state.rank);
	const listAvatar = computed(() => {
		return store.getters['rank/rankListAvatar'];
	});
	const songs = computed(() => {
		return store.getters['rank/listTracks'];
	});
	
	/* 跳转播放音乐页面 */
	function playMusic(id){
		uni.navigateTo({
			url: `/pages/play/play?id=${id}&list=${rankList.value.id}`
		});
	}
	
</script>

<style lang="scss" scoped>
	
	%flex {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.list-detail {
		padding-top: 60px;
		
		.header {
			font-size: 18px;
			font-weight: 600;
			color: #eee;
		}
		
		.bg-cover {
			display: flex;
			justify-content: space-around;
			align-items: center;
			padding: 0 15px;
			
			image {
				width: 130px;
				height: 130px;
				border-radius: 15px;
				margin: 30px 15px 30px 0;
				box-shadow: #eee 0 0 5px;
			}
			.description {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				flex: 1;
				height: 150px;
				width: 100%;
				font-size: 12px;
				color: #eee;
				.source {
					height: 34px;
					image {
						width: 30px;
						height: 30px;
						vertical-align: middle;
						box-shadow: none;
						margin: 0 10px 0 0;
					}
				}
				.des {
					width: 204px;
					height: 80px;
					display: -webkit-box;					// 将元素显示模式设定为弹性伸缩盒子模型
					-webkit-line-clamp: 5;				// 显示文本的行数
					-webkit-box-orient: vertical;			 // 弹性伸缩盒子对象子元素的排列方式
					text-overflow: ellipsis;
					overflow: hidden;
				}
			}
		}
		.hot {
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			width: 200px;
			height: 38px;
			margin: 0 auto;
			border-radius: 20px;
			background-color: #fff;
			box-shadow: #ddd 0 0 5px;
			
			text {
				padding: 0 8px;
				border-right: #eee solid 0.5px;
				font-size: 12px;
				&:last-child {
					border: none;
				}
			}
		}
		.list {
			margin: -19px 0;
			background-color: #fff;
			padding: 30px 15px 50px;
			
			.all {
				@extend %flex;
				height: 40px;
				.play-all {
					text {
						margin-right: 5px;
					}
					width: 80%;
					font-size: 16px;
					
					.icon-playall {
						font-size: 18px;
					}
					.total {
						color: #999;
						font-size: 12px;
					}
				}
				.icon-downmusic,
				.icon-select {
					font-size: 20px;
					color: #333;
				}
			}
			.songs {
				@extend %flex;
				height: 50px;
				// flex布局下
				.mv {
					width: 6%;
				}
				
				.song-info {
					display: flex;
					flex-direction: column;
					width: 73%;
					font-size: 14px;
					
					text{
						width: 100%;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
						
						&:last-child {
							font-size: 12px;
							color: #999;
						}
					}
				}
				.icon-mv,
				.icon-detail {
					color: #666;
					font-size: 18px;
				}
			}
		}
	}
</style>
