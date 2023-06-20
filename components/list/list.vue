<template>
	<!-- 自定义封装列表组件(uni-list) -->
	<view class="list">
		<!-- 列表头部(img) -->
		<view class="list-head">
			<image :src="src" mode=""></image>
		</view>
		<!-- 列表内容描述 -->
		<view class="list-body">
			<text>{{ title }}</text>
			<text>{{ content }}</text>
		</view>
		<!-- 列表侧边栏信息 -->
		<view class="list-foot" v-if="icon">
			<text class="iconfont" :class="icon"></text>
			<text v-if="descrpt"> {{ descrpt }}</text>
		</view>
	</view>
</template>

<script setup>
import { toRefs } from "vue";
	
	const props = defineProps({
		src: String,						// 图片
		title: String,					// 标题
		content: String,				// 子标题
		icon: String,						// 右侧图标
		descrpt: String					// 右侧信息描述
	});
	
	const {src, title, content, foot, descrpt } = toRefs(props);
	
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
		width: 75%;
		text {
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			
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
		height: 50px;
		
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