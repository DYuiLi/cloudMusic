<template>
	<view class="nav" :style="{background: `rgba(238, 44, 44, ${opacity})`}">
		<!-- 标题 -->
		<view class="navBar">
			<view class="back">
				<text class="iconfont icon-back" @click="goBack"></text>
			</view>
			<view class="body">
				<text class="title">{{ pageName.name }}</text>
				<text class="subtitle" v-if="pageName.singer">{{ pageName.singer }}</text>
			</view>
			<view class="right"></view>
		</view>
		<!-- 导航栏 -->
		<slot name="nav"></slot>
	</view>
</template>

<script setup>
	import { toRefs } from "vue";

	const props = defineProps({
		pageName: {
			name: String,
			singer: String
		},
		opacity: Number 
	});
	
	const { pageName, opacity } = toRefs(props);
	
	// 返回上一页
	function goBack() {		
		uni.navigateBack();
	}
</script>

<style lang="scss" scoped>
	.nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 999;
		// border-bottom: #999 solid 0.1px;
		padding: 10px 15px 0;

		.navBar {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 50px;

			.back {
				width: 15%;
				font-weight: 800;
			}

			.body {
				display: flex;
				flex-direction: column;
				text-align: center;
				width: 70%;

				.title {
					width: 100%;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}

				.subtitle {
					margin-top: 5px;
					font-size: 12px;
					color: #eee;
				}
			}

			.right {
				width: 15%;
			}
		}
	}
</style>