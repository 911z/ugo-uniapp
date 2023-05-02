export default {
	methods: {
		checkAuth(){
			const token = uni.getStorageSync("ugo-token")

			if(!token) {
				uni.navigateTo({
					url: "/packone/auth/index"
				})
			}
		}
	}
}