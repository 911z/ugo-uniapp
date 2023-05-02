<template>
  <view class="swiper-section">
    <swiper class="swiper" indicator-dots>
      <swiper-item v-for="item in goodDetail.pics" :key="item.goods_id">
        <image class="img" :src="item.pics_big_url" />
      </swiper-item>
    </swiper>

    <view class="desc">
      <view class="price">{{ '¥' + goodDetail.goods_price }}</view>
      <view class="container">
        <view class="title">{{ goodDetail.goods_name }}</view>
        <uni-icons type="star" size="40"></uni-icons>
      </view>

      <view class="ems">快递: 免运费</view>
    </view>

    <rich-text :nodes="goodDetail.goods_introduce"></rich-text>

    <view class="buy">
      <uni-goods-nav @click="onClick" @buttonClick="rightOnClick"></uni-goods-nav>
    </view>
  </view>
</template>

<script>
import Vue from 'vue';
import { getGoodDetailAPI } from "../../api/search/index"
import UniGoodsNav from "../../components/uni-goods-nav/uni-goods-nav.vue"

export default Vue.extend({
  components: {
    UniGoodsNav
  },
  data() {
    return {
      goods_id: "", // 商品id
      goodDetail: {}, // 商品详情信息
      cartList: uni.getStorageSync("cartData") || [] // 购物车列表
    }
  },
  computed: {},
  methods: {
    // 根据id获取商品详情
    async getGoodDetail(id) {
      const res = await getGoodDetailAPI(id)
      this.goodDetail = res.data
    },

    onClick(e) {
      console.log(e)
    },

    rightOnClick(e) {
      console.log(e)
      if (e.content.text === '加入购物车') {
        // 判断购物车内是否存在此商品
        let good = this.cartList.find(item => item.goods_id === this.goodDetail.goods_id)

        if (!good) {
          // 不存在, 将字段添加到购物车
          const { goods_id, goods_name, goods_price, goods_small_logo } = this.goodDetail
          this.cartList.push({
            goods_id,
            goods_name,
            goods_price,
            goods_small_logo,
            goods_count: 1,
            goods_checked: true
          })
        } else {
          // 此商品已经存在于购物车,只增加商品数量
          good.goods_count++
        }

        uni.setStorageSync("cartData", this.cartList)

        uni.showToast({
          title: "添加成功~"
        })
      }
    }
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(query) { // query: 获取首页navgate传递过来的参数
    this.goods_id = query.id
    this.getGoodDetail(query.id)
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() { },
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() { },
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
.swiper {
  height: 500rpx;
  text-align: center;
}

.desc {
  margin: 30rpx;

  .price {
    color: red;
    font-size: 40rpx;
  }

  .ems {
    font-size: 20rpx;
    color: darkgrey;
  }

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.buy {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>