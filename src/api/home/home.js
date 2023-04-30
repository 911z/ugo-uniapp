
import request from "../../utils/request"

// 轮播图列表
export const getSwiperListAPI = () => request({
	url: "/home/swiperdata"
})

// 获取分类选项数据
export const getCateItemsAPI = () => request({
	url: "/home/catitems"
})

// 获取楼层数据
export const getFloorListAPI = () => request({
	url: "/home/floordata"
})