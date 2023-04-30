
// 封装网络请求方法

const BASE_URL = "https://api-hmugo-web.itheima.net/api/public/v1"

const request = async ({url, data, header = {}, method}) => {

	uni.showLoading({
		title: "请求中~"
	})

	// 从本地获取token
	const token = uni.getStorageSync("ugo-token")

	if(token) header.Authorization = token

	const res = await uni.request({
		url: BASE_URL + url,
		method,
		data,
		header
	})

	// 无论请求成功/失败都关闭loading
	uni.hideLoading()

	if(res.statusCode === 200) {
		return {
			msg: res.data.meta,
			data: res.data.message
		}
	}else {
		return Promise.reject(res.statusCode)
	}
}

export default request