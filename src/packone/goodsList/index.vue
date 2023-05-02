<template>
	<view class="goods-list-container">
		<view class="shop-box" v-for="item in searchResultList" :key="item.goods_id" @click="gotoGoodsDetail(item)">
			<image class="shop-img" :src="item.goods_small_logo"></image>
			<view class="desc">
				<view class="title">{{ item.goods_name }}</view>
				<view class="price">{{ '¥' + item.goods_price }}</view>
			</view>
		</view>

		<view class="done" v-if="isMaxData === true">没有更多了...</view>
	</view>
</template>

<script>
import { searchResultAPI } from "../../api/search/index"

export default {
	onLoad(params) {
		this.queryParams.query = params.query
		this.getSearchResultData(this.queryParams)
	},
	components: {},
	created() { },
	data() {
		return {
			queryParams: {
				query: "",
				pagenum: 1,
				pagesize: 10,
			},
			total: 0,
			searchResultList: [] // 搜索结果列表
		}
	},
	methods: {

		onReachBottom() {
			if (this.isMaxData) return
			this.queryParams.pagenum++
			this.getSearchResultData(this.queryParams)
		},

		async getSearchResultData(params) {
			const res = await searchResultAPI(params)
			this.total = res.data.total
			this.searchResultList.push(...res.data.goods)
		},
		// 点击跳转到商品详情
		gotoGoodsDetail(item) {
			uni.navigateTo({
				url: `/packone/goods/index?id=${item.goods_id}`
			})
		}
	},
	computed: {
		isMaxData() {
			return this.searchResultList.length === this.total
		}
	},
	watch: {}
}
</script>

<style lang="scss" scoped>
.shop-box {
	display: flex;
	justify-content: space-between;
	margin: 20rpx;
	height: 230rpx;

	.shop-img {
		width: 230rpx;
		height: 230rpx;
	}

	.desc {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-left: 20rpx;

		.price {
			color: red;
			font-size: 40rpx;
			font-weight: bold;
		}
	}
}

.done {
	height: 100rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
