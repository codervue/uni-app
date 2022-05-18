<template>
	<view>
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,index) in goods_info.pics" :key="index" @click="itemClick(index)">
				<view class="swiper-item">
					<image :src="item.pics_big" mode=""></image>
				</view>
			</swiper-item>
		</swiper>
		<!-- 商品价格信息 -->
		<view class="goods-detail-name">
			<view class="goods-name-box">
				<!-- 商品名 -->
				<view class="goods-name">
					{{goods_info.goods_name}}
				</view>
				<view class="goods-icon">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<view class="goods-price">
				￥{{goods_info.goods_price}}
			</view>
			<!-- 快递 -->
			<view class="express">
				快递:包邮(免运费)
			</view>
		</view>
		<!-- 商品详情 -->
		<rich-text :nodes="goods_info.goods_introduce"></rich-text>
		<!-- 底部导航栏 -->
		<nav-bottom-bar @btnClick="btnClick"></nav-bottom-bar>
	</view>
</template>

<script>
	import {mapState,mapMutations} from "vuex"
	export default {
		data() {
			return {
				goods_info: ""
			};
		},
		computed:{
			...mapState("m_cart",['cart'])
		},
		onLoad(options) {
			let id = options.goods_id
			this.getGoodsDetail(id)
		},
		methods: {
			// 请求商品详情数据
			async getGoodsDetail(goods_id) {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/detail', {
					goods_id
				})
				if (res.meta.status !== 200) return uni.$showMsg()
				// 为 data 中的数据赋值
				this.goods_info = res.message
			},
			itemClick(index) {
				uni.previewImage({
					current: index,
					urls: this.goods_info.pics.map((item) => item.pics_big)
				})
			},
			//辅助函数挂载到页面
			...mapMutations("m_cart",["addToCart"]),
			//点击加入购物车回调
			btnClick(e){
				//判断是否点击的是加入购物车的按钮
				if (e.content.text === "加入购物车") {
					//创建对象用于存储购物车需要展示的商品基本信息
					const goods = {
						goods_id: this.goods_info.goods_id, // 商品的Id
						goods_name: this.goods_info.goods_name, // 商品的名称
						goods_price: this.goods_info.goods_price, // 商品的价格
						goods_count: 1, // 商品的数量
						goods_small_logo: this.goods_info.goods_small_logo, // 商品的图片
						goods_state: true // 商品的勾选状态
					}
					//提交商品信息到vuex
					this.addToCart(goods)
					//点击弹窗信息
					uni.showToast({
						title: `加入购物车成功`,
						icon: 'none'
					})
				}	
			}
		}
	}
</script>

<style lang="scss">
	swiper-item {
		height: 750rpx;

		.swiper-item image {
			width: 100%;
		}
	}
	.goods-detail-name{
		padding: 10px 7px;
		.goods-name-box{
			display: flex;
			justify-content: space-between;
			.goods-name{
				width: 80%;
				font-size: 13px;
				border-right: 1px solid #e2e2e2;
				padding-right: 5px;
			}
			.goods-icon{
				width: 20%;
				text-align: center;
				font-size: 12px;
				color: #666;
				display: flex;
				flex-direction: column;
			}
		}
		.goods-price{
			color: #c00000;
			margin: 10px 0;
		}
		.express{
			font-size: 12px;
			color: #666;
		}
	}
</style>
