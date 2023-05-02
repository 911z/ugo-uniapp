<template>
	<view class="container">
		<input v-model="value" class="input" placeholder="请输入商品名称" @click="searchClick" @input="searchValue">
		<!-- 搜索历史 -->
		<view class="box" v-if="isShowSearchHistory">
			<view v-if="searchSuggestList.length === 0">
				<view class="title">
					<text>搜索历史</text>
					<uni-icons type="close" size="20"></uni-icons>
				</view>

				<view class="search-history">
					<view class="item" v-for="item in historyList" @click="gotoGoodsInfo(item)">{{ item }}</view>
				</view>
			</view>
		</view>

		<!-- 搜索建议 -->
		<view v-else class="searchSuggest" v-if="searchSuggestList.length !== 0">
			<scroll-view scroll-y>
				<view class="item" v-for="item in searchSuggestList" :key="item?.goods_id">{{ item.goods_name }}</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import { searchSuggestAPI } from "../../api/search/index"
import _ from "lodash"

export default {
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
			searchHistoryList: [],
			value: "",
			searchSuggestList: [] // 搜索建议列表
		}
	},
	methods: {
		// 搜索框聚焦时,转跳到搜索商品页面
		focusFn() {
			uni.navigateTo({
				url: '/packone/search/index',
			})
		},
		searchClick() {
			this.$emit("click")
		},
		// 搜索框防抖
		searchValue: _.debounce(async function () {
			const res = await searchSuggestAPI(this.value)
			this.searchSuggestList = res.data || []

			if (this.value !== '') this.saveSearchHistory()
		}, 300),

		// 保存搜索关键词为历史记录
		saveSearchHistory() {
			// 1. 将 Array 数组转化为 Set 对象
			const set = new Set(this.searchHistoryList)
			// 2. 调用 Set 对象的 delete 方法，移除对应的元素
			set.delete(this.value)
			// 3. 调用 Set 对象的 add 方法，向 Set 中添加元素
			set.add(this.value)
			// 4. 将 Set 对象转化为 Array 数组
			this.searchHistoryList = Array.from(set)
			uni.setStorageSync('searchHistory', JSON.stringify(this.searchHistoryList))
		},

		// 点击搜索历史前往商品列表
		gotoGoodsInfo(kw) {
			uni.navigateTo({
				url: '/packone/goodsList/index?query=' + kw
			})
		}
	},
	computed: {
		historyList() {
			return [...this.searchHistoryList].reverse()
		}
	},
	watch: {},
	onLoad() {
		this.searchHistoryList = JSON.parse(uni.getStorageSync('searchHistory') || '[]')
	}
}
</script>

<style lang="scss" scoped>
.input {
	margin: 10rpx 20rpx;
	padding-left: 40rpx;
	box-sizing: border-box;
	width: 700rpx;
	height: 80rpx;
	border-radius: 10rpx;
	background-color: #f5f5f5;
}

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

.searchSuggest {
	scroll-view {
		height: calc(100vh - 120rpx);
	}

	.item {
		background-color: #f5f5f5;
		padding: 20rpx;
		margin: 20rpx 0;
	}
}
</style>
