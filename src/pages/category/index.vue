<template>
  <view>
    <!-- 搜索框 -->
    <view class="search-box">
      <search-bar></search-bar>
    </view>
    <view class="container">

      <!-- 分类区域 -->
      <view class="shop-cate">
        <scroll-view class="shopTitle left" scroll-y>
          <view class="title" v-for="(item, index) in data" :key="item.cat_id" @click="changeSelected(index)">
            <view :class="selected === index ? 'active' : ''">{{ item.cat_name }}</view>
          </view>
        </scroll-view>

        <scroll-view class="shopTitle right" scroll-y>
          <block v-for="item in data" :key="item.cat_id">
            <view class="goods" v-for="subItem in item.children" :key="subItem.cat_id">
              <view class="lever2">{{ `/${subItem.cat_name}/` }}</view>

              <view class="goods-info">
                <view class="lever2-shop" v-for="subItemShop in subItem.children">
                  <view class="container">
                    <image class="photo" :src="subItemShop.cat_icon"></image>
                    <view class="shop_title">{{ subItemShop.cat_name }}</view>
                  </view>
                </view>
              </view>
            </view>
          </block>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script>
import Vue from 'vue';
import { getCategoryList } from "../../api/category/index"
export default Vue.extend({
  components: {},
  data() {
    return {
      data: [],
      selected: 0, // 记录左侧选中状态
    }
  },
  computed: {},
  methods: {
    async getCategoryData() {
      const res = await getCategoryList()
      this.data = res.data
    },

    changeSelected(index) {
      this.selected = index
    }
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {
    this.getCategoryData()
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

<style lang="scss" scoped>
.container {
  display: flex;
}

.search-box {
  height: 100rpx;
}

.shop-cate {
  display: flex;
  flex: 1;
}

.shopTitle {
  margin-top: 20rpx;
  height: calc(100vh - 150rpx);

  .title {
    text-align: center;
    width: 150rpx;
    height: 100rpx;
    line-height: 100rpx;
    background-color: #f5f5f5;
    font-size: 25rpx;
  }
}

.active {
  color: #f00;
  background-color: #fff;
}

.shopTitle.left {
  width: 150rpx;

  text {
    width: 150rpx;
    height: 100rpx;
  }
}

.shopTitle.right {
  text-align: center;
  margin: 20rpx 0;
}

.lever2 {
  font-weight: bold;
}


.goods-info {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.lever2-shop {
  margin: 10rpx;
  width: 130rpx;

  .container {
    display: flex;
    flex-direction: column;

    .photo {
      width: 130rpx;
      height: 130rpx;
    }

    .shop_title {
      padding: 10rpx;
      font-size: 22rpx;
    }
  }
}
</style>