<template>
	<view class="rank">
		<!-- 导航栏 -->
		<rank-header :pageName="{name:'排行榜'}" class="rank-header">
			<template v-slot:nav>
				<view class="menu">
					<!--  -->
					<text v-for="(nav, index) in navList" :key="index" :class="{active: scrollTop===index}"
						@click="scrollTo(index)">{{ nav }}</text>
				</view>
			</template>
		</rank-header>
		<!-- 排行榜 -->
		<view class="rank-list">
			<view class="rank-list-rcmd">
				<text>榜单推荐</text>
				<view class="rank-list-rcmd-item">
					<image :src="rank.coverImgUrl" v-for="rank in recmdRank" :key="rank.id" 
					 @click="goListDetail(rank.id)"></image>
				</view>
			</view>
			<!-- 官方榜 -->
			<view class="rank-list-official">
				<view class="title">
					<text>官方榜</text>
				</view>
				<view class="rank-list-official-item" v-for="rank in offRank" :key="rank.id" 
					@click="goListDetail(rank.id)">
					<view class="item-name">
						<text>{{ rank.name }}</text>
						<text>{{ rank.updateFrequency}}</text>
					</view>
					<view class="item-info">
						<image :src="rank.coverImgUrl"></image>
						<view class="song-info" >
							<view v-for="(song, index) in rank.tracks" :key="song.id">
								<text class="order">{{ index + 1 }} </text>
								<text class="song-name"> {{ song.name }} - {{ singer(song.ar) }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			
		</view>
		<!-- 底部音乐播放栏 -->
		<play-shortcut></play-shortcut>
	</view>
</template>

<script setup>
	import { computed, onMounted, reactive, ref, toRefs } from "vue";
	import { useStore } from 'vuex';
	import { onLoad } from "@dcloudio/uni-app";
	import { singer } from '@/common/util.js';
	
	const navList = reactive(["官方", "精选", "曲风", "语种", "全球"]);
	const store = useStore();
	
	onLoad((option) => {
		store.dispatch('rank/getAllRank');
		// console.log(allRanks);
	});
	
	// 提取仓库中state的数据
	const { allRanks, rankList} = toRefs(store.state.rank);
	
	let scrollTop = ref(0);				// 页面滚动高度初始值
	onMounted(() => {
		// 监听页面滚动事件，用于切换导航栏分类标签的展示状态
		window.addEventListener('scroll', () => {
			let top = document.documentElement.scrollTop;
			switch(top){
				case top > 225:
					scrollTop.value = 1;
					break;
				// 其他情况待完善补充
				default: 
					break;
			}
		}, true);
	})
	
	/* 点击定位排行榜歌单分类 */
	function scrollTo(index) {
		switch(index){
			case 0:
				setScrollTop(160);
				break;
			// 其他分类待补充
			default:
			
				break;
		}
	}
	function setScrollTop(top){
		uni.pageScrollTo({
			scrollTop: top,
			duration: 100
		});
	}
	
	// 获取排行榜歌单数据
	function getData(ID){
		store.dispatch('rank/getRankListById', ID);
	}
	
	/* 获取榜单数据 */
	const recmdRank = computed(() => {
		store.getters['rank/recmdRank'].forEach(item => {
			getData(item.id);
		});
		return store.getters['rank/recmdRank'];
	});
	const offRank = computed(() => {
		store.getters['rank/offRank'].forEach(item => {
			getData(item.id);
		});
		return store.getters['rank/offRank'];
	});
		
	// 返回上一层函数
	function goBack(){
		// uni.navigateBack();
		uni.switchTab({
			url: '/pages/index/index'
		})
	}
	
	/* 跳转榜单详情页面 */
	function goListDetail(id){
		uni.navigateTo({
			url: `/pages/rank-list-deail/rank-list-deail?id=${id}`
		});
	}
</script>

<style lang="scss" scoped>
	.rank {
		background-color: #f5f5f5;
		padding: 110px 15px 60px;
		.rank-header{
			background-color: #f5f5f5;
			font-size: 18px;
			font-weight: 600;
			color: #333;
			
			.menu {
				display: flex;
				justify-content: space-around;
				align-items: center;
				
				height: 40px;
				text {
					font-size: 14px;
					color: #999;
				}
				.active {
					color: #000;
				}
			}
		}
		
		.rank-list {
			&-rcmd {
				font-weight: 800;
				&-item {
					display: flex;
					justify-content: space-between;
					margin-top: 15px;
					
					image {
						width: 110px;
						height: 110px;
						background-color: #fff;
						border-radius: 15px;
						box-shadow: #ddd 0 0 5px;
						text {
							display: flex;
							flex-direction: column;
							
							margin-top: 10px auto;
							font-weight: 400;
							font-size: 16px;
							&:last-child {
								font-size: 14px;
							}
						}
					}
				}
			}
			&-official {
				margin-top: 15px;
				.title {
					
					text:last-child {
						font-weight: 800;
					}
				}
				&-item {
					margin-top: 15px;
					height: 100px;
					border-radius: 15px;
					box-shadow: #ddd 0 0 5px;
					background-color: #fff;
					padding: 10px 15px;
					
					.item-name {
						display: flex;
						justify-content: space-between;
						align-items: center;

						text {
							&:first-child {
								font-size: 20px;
								font-weight: 600;
							}
							&:last-child {
								font-size: 12px;
								color: #999;
							}
						}
					}
					.item-info {
						display: flex;
						align-items: center;
						margin-top: 10px;
						
						image {
							width: 60px;
							height: 60px;
							border-radius: 15px;
							margin-right: 15px;
						}
						.song-info {
							display: flex;
							flex-direction: column;
							// align-items: center;
							justify-content: space-between;
							
							height: 60px;
							font-size: 12px;
							color: #666;
							
							.order {
								font-weight: 800;
								margin-right: 5px;
							}
							.song-name {
								display: inline-block;
								width: 200px;
								vertical-align: top;
								
								white-space: nowrap;					// 强制文本不换行
								text-overflow: ellipsis;			// 超出宽度部分文本显示为省略号
								overflow: hidden;							// 隐藏超出部分
							}
						}
					}
				}
			}
		}
	}
</style>
