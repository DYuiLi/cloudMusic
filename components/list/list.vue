<template>
	<view class="list">
		<view class="list-head">
			
		</view>
		<view class="list-content">
			
		</view>
		<view class="list-right">
			
		</view>
		<ul>
			<li>
				<text class="iconfont icon-message"></text>
				<text>{{title}}</text>
				<text class="iconfont icon-right"></text>
			</li>
		</ul>
	</view>
</template>

<script>
	import {props} from 'vue';
	
	export default {
		props: ['title'],
		
		setup() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.list {
		margin-top: 20px;
		width: 100%;
		ul {
			list-style: none;
			border-radius: 15px;
			background-color: #fff;
			li {
				
			}
		}
	}
</style>