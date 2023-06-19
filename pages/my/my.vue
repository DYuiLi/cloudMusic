<template>
	<view class="my">
		<!-- 自定义头部 -->
		<custom-header class="cheader">
			<template v-slot:body>
				<view class="cheader-body"></view>
			</template>
			<template v-slot:foot>
				<text class="iconfont icon-search cheader-foot"></text>
			</template>
		</custom-header>
		<!-- 个人信息部分 -->
		<view class="avatar">
			<image src="@/static/iconfont/avatar.png"></image>
			<view class="detail">
				<view class="username"> {{ username }} </view>
				<view class="info">
					<text>7关注</text>
					<text class="mid">4粉丝</text>
					<text>Lv.7</text>
				</view>
			</view>
		</view>
		<!-- 应用 -->
		<view class="application">
			<view class="apps">
				<view class="apps-item" v-for="item in sorts" :key="item.id">
					<text class="iconfont icon" :class="item.icon"></text>
					<text class="descrpt">{{ item.des}}</text>
				</view>
			</view>
			<view class="add">
				<text class="iconfont icon-add"></text>
				<text>音乐应用</text>
			</view>
		</view>
		<!-- 心动模式 -->
		<view class="iLike">
			<view class="iLike-header">
				<image src="../../static/logo.png" mode=""></image>
			</view>
			<view class="iLike-body">
				<text>我喜欢的音乐</text>
				<text>37首 已下载1首</text>
			</view>
			<view class="iLike-footer">
				<text class="iconfont icon-like"></text>
				<text> 心动模式</text>
			</view>
		</view>
		<!-- 歌单 -->
		<view class="lists">
			<view class="sorts">
				<text>创建歌单</text>
				<text>收藏歌单</text>
				<text>歌单助手</text>
			</view>
			<view class="lists-create">
				<view class="title">
					<text>创建歌单(6个)</text>
					<text class="iconfont icon-add"></text>
					<text class="iconfont icon-detail"></text>
				</view>
				<view class="list-item" v-for="item in 6">
					<view class="list-item-header">
						<image src="../../static/logo.png" mode=""></image>
					</view>
					<view class="list-item-body">
						<text>Taylor Swift</text>
						<text>10首</text>
					</view>
					<view class="list-item-footer">
						<text class="iconfont icon-detail"></text>
					</view>
				</view>
			</view>
			<view class="lists-collect">
				<view class="title">
					<text>收藏歌单(3个)</text>
					<text class="iconfont icon-detail"></text>
				</view>
				<view class="list-item" v-for="item in 3">
					<view class="list-item-header">
						<image src="../../static/logo.png" mode=""></image>
					</view>
					<view class="list-item-body">
						<text>自习室午睡半小时</text>
						<text>95首，by xxxx</text>
						
					</view>
					<view class="list-item-footer">
						<text class="iconfont icon-detail"></text>
					</view>
				</view>
			</view>
			<view class="lists-assist">
				<view class="assist">
					<text>歌单助手</text>
					<text>你可以在歌单中筛选出</text>
					<text class="recmd"></text>
					<text></text>
				</view>
				<button type="default">试试看</button>
			</view>
		</view>
		<play-shortcut></play-shortcut>
	</view>
</template>

<script>
import { reactive } from "vue";

	export default {
		setup() {
			
			const sorts = reactive([
					{id: 1, des: "最近播放", icon: "icon-login"},
					{id: 2, des: "本地/下载", icon: "icon-login"},
					{id: 3, des: "云盘", icon: "icon-login"},
					{id: 4, des: "已购", icon: "icon-login"},
					{id: 5, des: "我的好友", icon: "icon-login"},
					{id: 6, des: "收藏和赞", icon: "icon-login"},
					{id: 7, des: "我的播客", icon: "icon-login"},
					{id: 8, des: "乐谜团", icon: "icon-login"}
				]);
				
			return {
				username: "Yui_Lii",
				sorts
			};
		}
	}
</script>

<style lang="scss">
	
	%header {
		padding-top: 3px;
		image {
			width: 40px;
			height: 40px;
			margin-right: 10px;
			border-radius: 10px;
		}
	}
	
	%body {
		flex: 1;
		text {
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
	
	%footer {
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
	
	.my {
		padding: 80px 15px 20px;
		background-color: #f5f5f5;
		.cheader {
			background-color: #f5f5f5;
			&-body {
				display: inline-block;
				width: 70%;
				height: 30px;
			}
			&-foot {
				display: inline-block;
				width: 15%;
				font-size: 30px;
				color: #666;
				text-align: right;
				vertical-align: top;
			}
		}
		.avatar {
			margin-top: 5px;
			position: relative;
			height: 150px;
			image {
				position: absolute;
				left: 50%;
				z-index: 999;
				translate: -50%;
				width: 70px;
				height: 70px;
				border-radius: 50%;
				box-shadow: #ddd 0 0 5px;
				// background-color: pink;
			}
			.detail {
				position: absolute;
				top: 35px;
				z-index: 998;
				// height: 115px;
				width: 100%;
				border-radius: 15px;
				background-color: #fff;
				box-shadow: #ddd 0 0 5px;
				padding: 40px 0 15px;
				.username {
					font-size: 18px;
					font-weight: 800;
					text-align: center;
				}
				.info {
					margin-top: 10px;
					text-align: center;
					font-size: 14px;
					text {
						// line-height: 14px;
						padding: 0 12px
					}
					.mid {
						border-right: #666 solid 0.5px;
						border-left: #666 solid 0.5px;
					}
				}
			}
		}
		.application {
			margin-top: 15px;
			background-color: #fff;
			border-radius: 15px;
			box-shadow: #ddd 0 0 5px;
			padding: 10px;
			.apps {
				display: flex;
				flex-wrap: wrap;
				
				&-item {
					width: 25%;
					height: 50px;
					text {
						display: block;
						text-align: center;
					}
					.icon {
						color: #f33;
						margin-top: 10px;
						font-size: 30px;
					}
					.descrpt {
						margin-top: 3px;
						font-size: 12px;
					}
				}
			}
			.add {
				margin-top: 15px;
				padding-top: 10px;
				border-top: #eee solid 0.2px;
				text-align: center;
				color: #999;
				font-size: 12px;
			}
		}
		.iLike {
			display: flex;
			align-items: center;
			margin-top: 15px;
			height: 44px;
			background-color: #fff;
			border-radius: 15px;
			box-shadow: #ddd 0 0 5px;
			padding: 15px;
			
			&-header {
				@extend %header;
			}
			&-body {
				@extend %body;
			}
			&-footer {
				@extend %footer;
				
			}
		}
		.lists {
			.sorts {
				display: flex;
				margin-top: 15px;
				justify-content: space-around;
				height: 30px;
				text {
					font-size: 16px;
					color: #999;
					&:hover {
						color: #000;
					}
				}
			}
			&-create, &-collect, &-assist {
				margin-top: 10px;
				background-color: #fff;
				border-radius: 15px;
				box-shadow: #ddd 0 0 5px;
				padding: 10px 15px;
				.title {
					display: flex;
					align-items: center;
					justify-content: space-between;
					
					padding-bottom: 5px;
					margin-bottom: 5px;
					border-bottom: #eee solid 0.5px;
					font-size: 14px;
					color: #999;
					text {
						&:first-child {width: 80%;}
						&:nth-child(2){
							font-size: 20px;
							&:hover {
								background-color: #eee;
							}
						}
					}
				}
				.list-item {
					display: flex;
					align-items: center;
					height: 50px;
					&-header {
						@extend %header;
					}
					&-body {
						@extend %body;
					}
				}
				.assist {
					display: flex;
					flex-direction: column;
					height: 100px;
					font-size: 14px;
					color: #999;
					text {
						&:nth-child(2){
							margin: 5px auto;
							text-align: center;
						}
					}
				}
				button {
					width: 90px;
					height: 30px;
					border-radius: 15px;
					background-color: #f55;
					font-size: 14px;
					color: #fff;
					line-height: 30px;
				}
			}
		}
	}
</style>
