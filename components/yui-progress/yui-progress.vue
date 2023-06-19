<template>
	<view class="progress">
		<!-- 进度条背景 -->
		<view id="bgd" class="background" @touchstart="touchStart" @touchend="touchEnd">
			<!-- 进度条实际进度 -->
			<view class="real" :style="{width: props.progress + '%'}"></view>
		</view>
		<!-- 拖拽圆点-当前进度 -->
		<view class="dot" :style="{left: props.progress - dotRaduis +'%'}" @touchmove="touchMove"></view>
		<!-- <view class="dot" :class="{down: animation, up: !animation}" 
			:style="{left: progress - 5 +'px'}" 
			@touchmove="touchMove"></view> -->
	</view>
</template>

<script setup>
	import {  onMounted, ref } from "vue";
	// import { onLoad, onReady } from "@dcloudio/uni-app"

	/* 组件间通信 emits、props */
	const emits = defineEmits(['progress']);
	const props = defineProps({
		progress: Number
	});

	let prog; 									// 进度条元素对象
	let position; 							// 当前元素上下左右、宽高等位置信息
	let dotRaduis; 							// 圆点半径所占半分比
	let prgsVal = ref(0); 			// 计算进度条拖动长度(%)

	onMounted(() => {
		prog = document.getElementById('bgd');
		position = prog.getBoundingClientRect();
		dotRaduis = 7.5 / position.width * 100;
	});

	// let animation = ref(false);		// 点击滑块增加动画

	function changeProgress(e) {
		let { clientX } = e.touches[0]; // clientX: 元素e距离浏览器有效区域x轴的位置，包括触摸移动事件和开始触摸事件
		prgsVal.value = (clientX - position.left) / position.width * 100;
		if (prgsVal.value < 0) {
			prgsVal.value = 0;
		} else if (prgsVal.value > 100) {
			prgsVal.value = 100;
		}
	}
	/* 当前时刻触发/移动/触发结束修改事件，进度条单位：% */
	function touchStart(e) {
		// animation.value = true;
		changeProgress(e);
		emits('progress', prgsVal.value);
	}

	function touchMove(e) {
		// animation.value = true;
		changeProgress(e);
		emits('progress', prgsVal.value);
	}

	function touchEnd() {
		// animation.value = false;
		// 将百分比数据返回
		emits('progress', prgsVal.value);
	}
</script>

<style lang="scss">
	.progress {
		position: relative;
		box-sizing: border-box; // 消除margin带来的偏差

		.background {
			width: 100%;
			height: 3px;
			background: rgba(#ccc, 0.3);

			.real {
				height: 3px;
				background-color: #fff;
			}
		}

		.dot {
			position: absolute;
			top: -6px;
			left: -7px;
			width: 15px;
			height: 15px;
			border-radius: 50%;
			background-color: #fff;
		}

		/* 动画效果还存在问题：效果不能与touchmove事件同步 
				.down {
					animation: press 0.5s linear;
					$width: 20px;
					@keyframes press {
						to {
							top: -8px;
							width: 20px;
							height: 20px;
						}
					}
				}
				.up {
					$width: 10px;
					animation: unpress 0.5s linear;
					@keyframes unpress {
						to {
							top: -3px;
							width: 10px;
							height: 10px;
						}
					}
				}*/
	}
</style>