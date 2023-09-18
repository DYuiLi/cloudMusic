<template>
	<view class="container">
		<!-- <slot></slot>标签中表示默认内容 -->
		<!-- #ifndef MP -->
		<slot>
			<text class="iconfont icon-more left" @click="showDrawer"></text>
		</slot>
		<!-- #endif -->
		
		<slot name="middle" class="middle"></slot>
		<!-- #ifndef MP -->
		<slot name="right" class="right"></slot>
		<!-- #endif -->
	</view>
</template>

<script setup>
	
	const emits = defineEmits(['show']);
	
	function showDrawer() {
		emits('show');
	}
	
</script>

<style lang="scss">
	@import '@/common/common.scss';
	
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
		@include padding(30px, 15px, 10px);
		
		/* #ifdef MP */
		
		@include padding(70px, 15px, 10px);		// 避免小程序默认按键遮挡
		justify-content: space-around;
		
		/* #endif*/
		
		.left, 
		.right {
			width: 30px;
		}
	}
	
</style>