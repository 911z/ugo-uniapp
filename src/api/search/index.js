import request from "../../utils/request";

// 搜索建议
export const searchSuggestAPI = (keyword) => request({
	url: "/goods/qsearch/?query=" + keyword,
})

// 搜索结果
export const searchResultAPI = (params) => request({
	url: "/goods/search",
	data: params
})

// 获取商品详情
export const getGoodDetailAPI = (id) => request({
	url: "/goods/detail/?goods_id=" + id,
})