<template>
  <div class="cart-container">
    <view class="nav-bar">
      <view class="icon">
        <uni-icons type="shop" size="30"></uni-icons>
      </view>
      <view class="text">购物车</view>
    </view>

    <view class="cart-item" v-for="(item, index) in cartList" :key="item.goods_count">
      <view class="selectBtn">
        <checkbox-group>
          <label>
            <checkbox value="cb" />
          </label>
        </checkbox-group>
      </view>
      <image class="img" :src="item.goods_small_logo" />
      <view class="goodDetail">
        <view class="title">{{ item.goods_name }}</view>

        <view class="bottom">
          <view class="price"> ¥ {{ item.goods_price }}</view>

          <view class="count">
            <button class="btn" @click="changeCount(index, -1)">-</button>
            <text>{{ item.goods_count }}</text>
            <button class="btn" @click="changeCount(index, 1)">+</button>
          </view>
        </view>
      </view>
    </view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  components: {},
  data() {
    return {
      cartList: uni.getStorageSync("cartData") // 从本地取出购物车数据
    }
  },
  computed: {},
  methods: {
    changeCount(index, step) {
      console.log(index, step)
      let currentGoodCount = this.cartList[index].goods_count

      if (step === -1 && currentGoodCount === 1) {
        uni.showToast({
          title: "购物车商品最小数量为1~"
        })
        return
      }

      if (step === 1 && currentGoodCount >= 6) {
        uni.showToast({
          title: "商品没有多余的库存啦~"
        })
        return
      }

      // currentGoodCount += step
      this.cartList[index].goods_count += step

      uni.setStorageSync("cartData", this.cartList)
    }
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() { },
  // 页面周期函数--监听页面初次渲染完成
  onReady() { },
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {
    this.cartList = uni.getStorageSync("cartData")
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
.cart-container {
  .nav-bar {
    display: flex;
    align-items: center;
    height: 80rpx;
    border-bottom: 1px solid #f5f5f5;

    .icon {
      width: 50rpx;
      margin-right: 20rpx;
    }

    .text {
      flex: 1;
      font-size: 30rpx;
    }
  }

  .cart-item {
    display: flex;
    align-items: center;
    margin: 10rpx 20rpx;
    height: 300rpx;

    .selectBtn {
      display: flex;
      align-items: center;
      justify-content: centers;
      width: 100rpx;
    }

    .img {
      margin-right: 20rpx;
      width: 200rpx;
      height: 200rpx;
    }

    .goodDetail {
      flex: 1;

      .bottom {
        display: flex;
        justify-content: space-between;
        margin-top: 40rpx;

        .price {
          margin-right: 20rpx;
          color: red;
          font-size: 30rpx;
          font-weight: bold;
        }

        .count {
          display: flex;
          width: 200rpx;
          height: 100rpx;

          .btn {
            text-align: center;
            height: 50rpx;
            line-height: 50rpx;
          }
        }
      }
    }
  }
}
</style>