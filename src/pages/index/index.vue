<template>
  <view class="container">

    <!-- 搜索框 -->
    <view class="search-section">
      <search-bar />
    </view>

    <!-- 轮播图 -->
    <view class="swiper-section">
      <u-swiper class="swiper" :list="swiperData" indicator circular height="350rpx" @click="swiperClick" />
    </view>

    <!-- 选项卡 -->
    <view class="tab-control">
      <view class="item" v-for="item in cateItems" :key="item.name">
        <navigator :url="item.navigator_url ? `/pages/category/index` : `/packone/goodsList/index`"
          :open-type="item.open_type === 'switchTab' ? 'switchTab' : 'navigate'">
          <image :src="item.image_src" />
        </navigator>
      </view>
    </view>

    <!-- 时尚女装 -->
    <view class="title">
      <image :src="womanData.floor_title.image_src"></image>
    </view>

    <view class="women-section">
      <view class="left-section">
        <image :src="womanData.product_list[0].image_src"></image>
      </view>
      <view class="right-section">
        <view class="item" v-for="(item, index) in womanData.product_list" :key="item.name" v-if="index !== 0">
          <image :src="item.image_src" />
        </view>
      </view>
    </view>

    <!-- 户外活动 -->
    <view class="title">
      <image :src="outDoorData.floor_title.image_src"></image>
    </view>

    <view class="women-section">
      <view class="left-section">
        <image :src="outDoorData.product_list[0].image_src"></image>
      </view>
      <view class="right-section">
        <view class="item" v-for="(item, index) in outDoorData.product_list" :key="item.name" v-if="index !== 0">
          <image :src="item.image_src" />
        </view>
      </view>
    </view>

    <!-- 箱包配饰 -->
    <view class="title">
      <image :src="bagData.floor_title.image_src"></image>
    </view>

    <view class="women-section">
      <view class="left-section">
        <image :src="bagData.product_list[0].image_src"></image>
      </view>
      <view class="right-section">
        <view class="item" v-for="(item, index) in bagData.product_list" :key="item.name" v-if="index !== 0">
          <image :src="item.image_src" />
        </view>
      </view>
    </view>

    <!-- 返回顶部按钮 -->
    <view class="backTopBtn" v-if="isShowBackTopBtn" @click="backTopBtnClick">
      <view class="container">
        <uni-icons type="top" color="#999"></uni-icons>
      </view>
    </view>

  </view>
</template>

<script>
import { getSwiperListAPI, getCateItemsAPI, getFloorListAPI } from "../../api/home/home"

export default {
  data() {
    return {
      swiperInfo: [], // 轮播图信息
      swiperData: [], // 轮播图图片
      cateItems: [], // 分类选项
      womanData: [], // 时尚女装
      outDoorData: [], // 户外活动
      bagData: [], // 箱包配饰
      scrollTop: [], // 当前距离顶部的位置
      isShowBackTopBtn: false // 是否显示回到顶部按钮
    }
  },
  onLoad() {
    this.getSwiperDataFn()
    this.getCateDataFn()
    this.getFloorDataFn()
  },
  methods: {
    // 点击回到顶部按钮
    backTopBtnClick() {
      uni.pageScrollTo({
        scrollTop: 0,
      })
    },
    // 获取轮播图数据
    async getSwiperDataFn() {
      const res = await getSwiperListAPI()

      const arr = res.data.map(item => {
        return item.image_src
      })

      this.swiperInfo = res.data
      this.swiperData = arr
    },

    // 获取分类选项数据
    async getCateDataFn() {
      const res = await getCateItemsAPI()
      this.cateItems = res.data
    },

    // 获取楼层数据
    async getFloorDataFn() {
      const res = await getFloorListAPI()
      this.womanData = res.data[0]
      this.outDoorData = res.data[1]
      this.bagData = res.data[2]
    },
    // 点击轮播图携带商品id跳转到商品详情页
    swiperClick(clickIndex) {
      this.swiperInfo.forEach((item, index) => {
        if (index === clickIndex) {
          uni.navigateTo({
            url: `/packone/goods/index?id=${this.swiperInfo[clickIndex].goods_id}`
          })
        }
      })
    }
  },

  // 监听下拉刷新
  onPullDownRefresh() {
    Promise.all([this.getSwiperDataFn(), this.getCateDataFn(), this.getFloorDataFn()]).then(() => {
      uni.stopPullDownRefresh()
    })
  },
  // 监听页面滚动,获取位置
  onPageScroll(location) {
    this.scrollTop = location.scrollTop
    // 判断当前滚动位置是否大于全屏高度的一半
    if (this.scrollTop > uni.getSystemInfoSync().windowHeight / 2) {
      this.isShowBackTopBtn = true // 显示按钮
    } else {
      this.isShowBackTopBtn = false // 不显示按钮
    }
  }
}
</script>

<style lang="scss"  scoped>
.swiper-section {
  height: 350rpx;
}

.tab-control {
  display: flex;
  justify-content: space-around;
  margin: 30rpx 0;

  .item {

    image {
      width: 120rpx;
      height: 120rpx;
    }
  }
}

.title {
  margin-left: 20rpx;

  image {
    height: 50rpx;
  }
}

.women-section {
  display: flex;
  margin: 0 20rpx 20rpx;

  .left-section {
    margin-right: 10rpx;

    image {
      width: 200rpx;
      height: 520rpx;
    }
  }

  .right-section {
    display: flex;
    flex-wrap: wrap;
  }

  .item {
    display: flex;
    flex-wrap: wrap;
    margin-right: 10rpx;

    image {
      width: 240rpx;
      height: 250rpx;
    }
  }
}

.backTopBtn {
  position: relative;

  .container {
    position: absolute;
    bottom: 100rpx;
    right: 20rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70rpx;
    height: 70rpx;
    background-color: #f5f5f5;
    border-radius: 50%;
    font-size: 30rpx;
  }
}
</style>
