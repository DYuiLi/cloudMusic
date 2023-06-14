<template>
	<!-- #ifdef MP-WEIXIN -->
	<!-- 垫高微信小程序头部导航部分高度 -->
	<view class="miniP"></view>
	<!-- #endif -->
	<view class="container">
		<!-- <slot></slot>标签中表示默认内容 -->
		<slot>
			<text class="iconfont icon-more header" @click="showDrawer"></text>
		</slot>
		<slot name="body" class="body"></slot>
		<slot name="foot" class="footer"></slot>
	</view>
</template>

<script>
	
	export default {
		
		emits: ['show'],
		
		setup(props, context) {
			
			function showDrawer(){
				context.emit('show');
			}
			
			return {
				showDrawer
			};
		}
	}
</script>

<style lang="scss">
	$mini-padding: 70px 15px 10px;
	$normal-padding: 30px 15px 10px;
	
	.miniP {
		width: 100%;
		height: 30px;
	}
	
	.container {
		display: flex;
		justify-content: space-between;
		
		position: fixed;
		z-index: 9999;
		left: 0;
		right: 0;
		top: 0;
		box-sizing: border-box;
		
		background-color: #fff;
		padding: $normal-padding;
		
		.body {
			flex: 1;
		}
		.header, 
		.footer {
			width: 30px;
		}
	}
	
</style>