<template>
	<view class="auth-container">
		<button class="btn" type="primary" @click="loginClick">微信登录</button>
	</view>
</template>

<script>
import { loginAPI } from "../../api/login/index"
export default {
	name: 'auth-container',
	props: {},
	components: {},
	created() { },
	data() {
		return {}
	},
	onLoad() {
		this.getCode()
	},
	methods: {
		// 进入到页面时,就开始获取登录凭证,拿到返回的code
		async getCode() {
			const { code } = await uni.login()
			if (code) {
				this.code = code
			}
		},

		async loginClick() {
			// 1.获取微信用户信息 uni.getUserProfile
			const { encryptedData, rawData, iv, signature } = await uni.getUserProfile({
				desc: "获取微信用户信息"
			})

			if (rawData) {
				// 2.获取微信用户信息成功 

				// 3.获取微信用户登录凭证 uni.login

				// 4.获取登录凭证成功,调用后台接口
				const res = await loginAPI({
					code: this.code,
					encryptedData,
					rawData,
					iv,
					signature
				})
				console.log(res)
			}
		}
	},
	computed: {},
	watch: {}
}
</script>

<style lang="scss" scoped>
.auth-container {

	.btn {
		position: fixed;
		bottom: 50rpx;
		left: 0;
		margin: 0 20rpx;
		width: 700rpx;
	}
}
</style>
