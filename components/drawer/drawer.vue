<template>
	<div class="drawer" @click.self="hideDrawer">
		<view class="content" :class="{close: isClose}">
			<view class="profile">
				<image src="@/static/iconfont/avatar.png"></image>
				<text class="username">{{ username }}</text>
				<text class="iconfont icon-QRcode"></text>
			</view>
			<view class="personal">
				<ul>
					<li v-for="per in personalList" :key="per.id">
						<text class="iconfont" :class="per.icon"></text>
						<text>{{ per.des }}</text>
						<text class="iconfont icon-right right"></text>
					</li>
				</ul>
			</view>
			<view class="setting">
				<ul>
					<li v-for="set in settingsList" :key="set.id">
						<text class="iconfont" :class="set.icon"></text>
						<text>{{ set.des }}</text>
						<text v-if="set.id !== 2" class="iconfont icon-right right"></text>
						<switch v-else color="#f55" @change="" />
					</li>
				</ul>
			</view>	
			<view class="other">
				<ul>
					<li v-for="ot in otherList" :key="ot.id">
						<text class="iconfont" :class="ot.icon"></text>
						<text>{{ ot.des }}</text>
						<text class="iconfont icon-right right"></text>
					</li>
				</ul>
			</view>
			<button>退出登录/关闭</button>
		</view>
	</div>
</template>

<script>

import { onMounted, reactive, ref } from "vue";

	export default {

		emits: ['hide'],
		components: {
			// List
		},

		setup(props, context) {
			
			let isClose = ref(false);
			
			const personalList = reactive([
				{id:1, icon: "icon-message", des: "我的消息"},
				{id:2, icon: "icon-shopping", des: "商城"}
			]);
			const settingsList = reactive([
				{id:1, icon: "icon-settings", des: "设置"},
				{id:2, icon: "icon-night", des: "夜间模式"},
				{id:3, icon: "icon-timer", des: "定时退出"},
				{id:4, icon: "icon-theme", des: "个性装扮"},
				{id:5, icon: "icon-download", des: "边听边存"},
				{id:6, icon: "icon-youth", des: "青少年模式"},
				{id:7, icon: "icon-alarm", des: "音乐闹钟"}
			]);
			const otherList = reactive([
				{id:1, icon: "icon-service", des: "我的客服"},
				{id:2, icon: "icon-about", des: "关于"}
			]);
			
			const pageLocation = ref('');
			function hideDrawer() {
				isClose.value = true;
				
				// 恢复父组件滚动
				document.body.style.position = 'static';
				window.scrollTo(0, pageLocation.value);
				
				// 延时隐藏抽屉，展示隐藏动画效果
				setTimeout(function(){
					context.emit('hide');
				},300);
			}
			onMounted(() => {
				// 记录父组件滚动高度，并禁止父组件滚动
				let scrollTop = window.scrollY;//滚动的高度；
				pageLocation.value = scrollTop;
				document.body.style.position = 'fixed';
				document.body.style.top = '-' + scrollTop + 'px';
				
			});
			
			return {
				hideDrawer,
				username: "立即登录",
				isClose,
				personalList,
				settingsList,
				otherList
			}
		}
	}
</script>

<style lang="scss">
	.drawer {										/* 遮罩层 */
		position: fixed;
		z-index: 9999;
		margin-left: -15px;
		width: 100%;
		background: rgba(#000, 0.5);
		top: 0;
		bottom: 0;
		overflow: scroll;

		.content {
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			
			box-sizing: border-box;
			position: absolute;
			width: 80%;
			// height: 100%;
			background-color: #f5f5f5;
			padding: 20px;

			.profile {
				height: 32px;

				image {
					width: 32px;
					height: 32px;
					border-radius: 50%;
					margin-right: 10px;
					vertical-align: middle;
				}
				.username {
					color: #333;
					font-size: 12px;
				}
			}

			.personal,
			.setting,
			.other {
				margin-top: 20px;
				width: 100%;
				ul {
					list-style: none;
					border-radius: 15px;
					background-color: #fff;
					padding: 0;		/* 取消disc所占的位置 */
					box-shadow: 0 0 5px #ccc;
					li {
						height: 45px;
						border-bottom: #eee solid 0.1px;
						line-height: 45px;
						font-size: 14px;
						text {
							vertical-align: middle;
						}
						switch {
							transform: scale(0.5);
							position: absolute;
							right: 20px;
						}
						.right {
							position: absolute;
							right: 35px;
							transform: scale(0.8);
							color: #999;
						}
						&:last-child {
							border: none;
						}
					}
				}
			}

			button {
				margin-top: 20px;
				height: 40px;
				width: 100%;
				background-color: #fff;
				border-radius: 15px;
				color: #f00;
				font-size: 16px;
				box-shadow: 0 0 5px #ccc;
				&:hover {
					background-color: #eee;
				}
			}
			
			animation: active 0.5s linear;
			@keyframes active {
				from {
					width: 40%;
				}
				to {
					width: 80%;
				}
			}
		}
		.close {
			animation: close 0.5s ease;
			@keyframes close {
				from {
					width: 80%;
				}
				to {
					width: 40%;
				}
			}
		}
	}
</style>