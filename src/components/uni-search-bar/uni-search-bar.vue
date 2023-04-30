<template>
	<view class="container">
		<u-search margin="20rpx 0" shape="round" :searchIconSize="50" placeholder="请输入商品名称" height="80" :showAction="false"
			@focus="focusFn" />

		<!-- 搜索历史 -->
		<view v-if="isShowSearchHistory">
			<view class="title">
				<text>搜索历史</text>
				<uni-icons type="close" size="20"></uni-icons>
			</view>

			<view class="search-history">
				<view class="item" v-for="item in list">{{ item }}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'app',
	props: {
		isShowSearchHistory: {
			type: Boolean,
			default: false
		}
	},
	components: {},
	created() { },
	data() {
		return {
			list: [1, 2, 3, 4, 5, 'dsadsa', 'fdfdafadf', '123', '887']
		}
	},
	methods: {
		// 搜索框聚焦时,转跳到搜索商品页面
		focusFn() {
			uni.navigateTo({
				url: '/packone/search/index',
			})
		}
	},
	computed: {},
	watch: {}
}
</script>

<style lang="scss" scoped>
.search-history {
	display: flex;
	flex-wrap: wrap;
	padding: 0 20rpx;

	.item {
		padding: 0 20rpx;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
		height: 40rpx;
		background-color: #f5f5f5;
		color: #666;
	}
}

.title {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 20rpx;

	text {
		font-size: 30rpx;
	}
}
</style>
