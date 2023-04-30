<template>
	<view class="container">

		<!-- 搜索框 -->
		<view class="search-section">
			<search-bar />
		</view>

		<!-- 轮播图 -->
		<view class="swiper-section">
			<u-swiper class="swiper" :list="list1" indicator circular height="350rpx" />
		</view>

		<!-- 选项卡 -->
		<view class="tab-control">
			<view class="item" v-for="item in list1" :key="item">
				<image :src="item" />
			</view>
		</view>

		<!-- 时尚女装 -->
		<view class="title">
			<image src="https://cdn.uviewui.com/uview/swiper/swiper1.png"></image>
		</view>

		<view class="women-section">
			<view class="left-section">
				<image src="https://cdn.uviewui.com/uview/swiper/swiper1.png"></image>
			</view>
			<view class="right-section">
				<view class="item" v-for="item in list1" :key="item">
					<image :src="item" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {

	data() {
		return {
			list1: [
				'https://cdn.uviewui.com/uview/swiper/swiper1.png',
				'https://cdn.uviewui.com/uview/swiper/swiper2.png',
				'https://cdn.uviewui.com/uview/swiper/swiper3.png',
				'https://cdn.uviewui.com/uview/swiper/swiper3.png',
			]
		}
	},
	onLoad() {

	},
	methods: {

	}
}
</script>

<style lang="scss"  scoped>
.swiper-section {
	height: 350rpx;
}

.tab-control {
	display: flex;
	justify-content: space-around;
	margin: 30rpx 0;

	.item {

		image {
			width: 120rpx;
			height: 120rpx;
		}
	}
}

.title {
	margin-left: 20rpx;

	image {
		height: 50rpx;
	}
}

.women-section {
	display: flex;
	margin: 0 20rpx;

	.left-section {
		margin-right: 10rpx;

		image {
			width: 200rpx;
			height: 520rpx;
		}
	}

	.right-section {
		display: flex;
		flex-wrap: wrap;
	}

	.item {
		display: flex;
		flex-wrap: wrap;
		margin-right: 10rpx;

		image {
			width: 240rpx;
			height: 250rpx;
		}
	}
}
</style>
