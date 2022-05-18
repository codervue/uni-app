<template>
	<view>
		<!-- 搜索框 -->
		<view class="search-box">
			<search></search>
		</view>
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id">
					<image :src="item.image_src" mode=""></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 分类导航区域 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item,index) in navList" :key="index" @click="navClickHandler(item.name)">
				<image :src="item.image_src" mode=""></image>
			</view>
		</view>
		<!-- 楼层区域 -->
		<view class="floor-list">
			<view class="floor-item" v-for="(item,index) in floorList" :key="index">
				<!-- 楼层标题 -->
				<image :src="item.floor_title.image_src" mode="" class="floor-title"></image>
				<!-- 楼层内容图片 -->
				<view class="floor-box">
					<!-- 左边大图片 -->
					<navigator class="left-image" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src" mode=""
							:style="{width: item.product_list[0].image_width + 'rpx'}"></image>
					</navigator>
					<!-- 右边小图片 -->
					<view class="right-box">
						<navigator class="right-image" v-for="(item1,index1) in item.product_list" :key="index1"
							v-if="index1 !== 0" :url="item1.url">
							<image :src="item1.image_src" mode="" :style="{width: item1.image_width + 'rpx'}"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import badge from "@/mixin/tabbar-badge.js"
	export default {
		mixins:[badge],
		data() {
			return {
				swiperList: [],
				navList: [],
				floorList: []
			};
		},
		onLoad() {
			//页面加载时调用轮播图数据
			this.getSwiperList()
			//调用分类导航数据
			this.getNavList()
			//楼层数据的请求
			this.getFloorList()
		},
		methods: {
			async getSwiperList() {
				let {
					data: res
				} = await uni.$http.get("/api/public/v1/home/swiperdata")
				//数据请求失败的回调
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				}
				//请求成功后保存结果
				this.swiperList = res.message
			},
			async getNavList() {
				let {
					data: res
				} = await uni.$http.get("/api/public/v1/home/catitems")
				//数据请求失败的回调
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				}
				//请求成功后保存结果
				this.navList = res.message
			},
			//点击分类导航回调
			navClickHandler(item) {
				if (item === "分类") {
					uni.switchTab({
						url: "/pages/cartgory/cartgory"
					})
				}
			},
			//获取楼层数据
			async getFloorList() {
				let {
					data: res
				} = await uni.$http.get("/api/public/v1/home/floordata")
				//数据请求失败的回调
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				}
				//处理接口数据
				res.message.forEach(floor => {
					floor.product_list.forEach(prod => {
						prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
					})
				})
				//请求成功后保存结果
				this.floorList = res.message
			}
		}
	}
</script>

<style lang="scss">
	.search-box {
		// 直接定位搜索框不生效，必须给父盒子宽高
		position: sticky;
		top: 0;
		z-index: 100;
	}

	swiper {
		height: 330rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.nav-list {
		display: flex;
		justify-content: space-around;
		margin: 15px 0;

		.nav-item image {
			width: 128rpx;
			height: 140rpx;
		}
	}

	.floor-list {
		width: 100%;

		.floor-title {
			height: 60rpx;
			width: 100%;
		}

		.floor-box {
			width: 100%;
			display: flex;

			.right-box {
				display: flex;
				justify-content: space-around;
				flex-wrap: wrap;

				image {
					height: 95%;
				}
			}
		}
	}
</style>
