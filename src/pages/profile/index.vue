<template>
  <view class="profile-container">
    <view class="user-info">
      <open-data class="avatar" type="userAvatarUrl" />
      <open-data class="nickName" type="userNickName" />
    </view>

    <view class="bar margin">
      <view class="store">
        <view class="count">8</view>
        <view class="desc">收藏的店铺</view>
      </view>
      <view class="favor">
        <view class="count">8</view>
        <view class="desc">收藏的商品</view>
      </view>
      <view class="shop">
        <view class="count">8</view>
        <view class="desc">关注的商品</view>
      </view>
      <view class="foot">
        <view class="count">8</view>
        <view class="desc">足迹</view>
      </view>
    </view>

    <view class="order margin">
      <view class="title">我的订单</view>
      <view class="list">
        <view class="item">
          <uni-icons type="shop" size="50"></uni-icons>
          <view class="subtitle">待付款</view>
        </view>
        <view class="item">
          <uni-icons type="notification-filled" size="50"></uni-icons>
          <view class="subtitle">待收货</view>
        </view>
        <view class="item">
          <uni-icons type="mail-open-filled" size="50"></uni-icons>
          <view class="subtitle">退款/退货</view>
        </view>
        <view class="item">
          <uni-icons type="cart-filled" size="50"></uni-icons>
          <view class="subtitle">全部订单</view>
        </view>
      </view>
    </view>

    <view class="switchBar margin">
      <view class="item">
        <view class="title">收货地址</view>
        <uni-icons class="icon" type="forward" size="20"></uni-icons>
      </view>

      <view class="item" @click="makePhoneCall">
        <view class="title">联系客服</view>
        <uni-icons class="icon" type="forward" size="20"></uni-icons>
      </view>

      <view class="item">
        <button open-type="share" class="title">分享优购</button>
        <uni-icons class="icon" type="forward" size="20"></uni-icons>
      </view>

      <view class="item">
        <view class="title">退出登录</view>
        <uni-icons class="icon" type="forward" size="20"></uni-icons>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  components: {},
  data() {
    return {}
  },
  computed: {},
  methods: {
    makePhoneCall() {
      uni.makePhoneCall({
        phoneNumber: '10086',
      })
    }
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() { },
  // 页面周期函数--监听页面初次渲染完成
  onReady() { },
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {
    this.checkAuth()
  },
  // 页面周期函数--监听页面隐藏
  onHide() { },
  // 页面周期函数--监听页面卸载
  onUnload() { },
  // 页面处理函数--监听用户下拉动作
  // onPullDownRefresh() { uni.stopPullDownRefresh(); },
  // 页面处理函数--监听用户上拉触底
  // onReachBottom() {},
  // 页面处理函数--监听页面滚动(not-nvue)
  // onPageScroll(event) {},
  // 页面处理函数--用户点击右上角分享
  // onShareAppMessage(options) {},
}) 
</script>

<style scoped lang="scss">
.profile-container {
  background-color: #f5f5f5;
  height: 100vh;
}

.user-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 400rpx;
  background-color: pink;
}

.user-info .avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300rpx !important;
  height: 330rpx !important;
  border-radius: 50%;
}

.nickName {
  margin-top: -20rpx;
}

.margin {
  margin: 0 20rpx;
}

.bar {
  position: relative;
  top: -20rpx;
  display: flex;
  justify-content: space-around;
  text-align: center;
  align-items: center;
  height: 150rpx;
  background-color: #fff;
  border-radius: 20rpx;
  font-size: 30rpx;
}

.order {
  height: 270rpx;
  background-color: #fff;
  border-radius: 20rpx;


  .title {
    display: flex;
    align-items: center;
    height: 70rpx;
    padding-left: 20rpx;
    border-bottom: 2px solid #f5f5f5;
  }

  .list {
    display: flex;
    justify-content: space-around;
    padding-left: 20rpx;
    height: 100rpx;

    .item {
      .subtitle {

        text-align: center;
      }
    }
  }
}

.switchBar {
  margin-top: 30rpx;
  padding: 0 20rpx;
  background-color: #fff;
  border-radius: 20rpx;
  height: 400rpx;

  .item {
    display: flex;
    align-items: center;
    height: 100rpx;
    // background-color: #f5f5f5;

    .title {
      flex: 1;
    }

    .icon {
      margin-right: 20rpx;
      width: 30rpx;
    }
  }
}
</style>