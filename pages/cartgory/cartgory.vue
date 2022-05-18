<template>
	<view>
		<view class="search">
			<search></search>
		</view>	
		<view class="container">
			<!-- 左边滚动视图 -->
			<scroll-view class="left-scroll" scroll-y :style="{height:wh+'px'}">
				<view class="left-item" v-for="(item,index) in cartList" :key="index" @click="itemClick(index)"
					:class="{active:currentIndex===index}">
					{{item.cat_name}}
				</view>
			</scroll-view>
			<!--右边滚动视图 -->
			<scroll-view class="right-scroll" scroll-y :style="{height:wh+'px'}">
				<view class="right-item" v-for="(item,index) in cartList2" :key="index">
					<view class="title">{{item.cat_name}}</view>
					<view class="box">
						<view class="item" v-for="(item1,index1) in item.children" :key="index1"
							@click="goGoodsList(item1.cat_id)">
							<image :src="item1.cat_icon" mode=""></image>
							<text>{{item1.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import badge from "@/mixin/tabbar-badge.js"
	export default {
		mixins:[badge],
		data() {
			return {
				wh: 0,
				cartList: [],
				currentIndex: 0,
				cartList2: [],
			}
		},
		onLoad() {
			//获取滚动高度
			const info = uni.getSystemInfoSync()
			this.wh = info.windowHeight - 56			//请求分类数据
			this.getCateList()
		},
		methods: {
			async getCateList() {
				// 发起请求
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/categories')
				// 判断是否获取失败
				if (res.meta.status !== 200) return uni.$showMsg()
				// 转存数据
				this.cartList = res.message
				this.cartList2 = res.message[0].children
			},
			itemClick(index) {
				this.currentIndex = index
				this.cartList2 = this.cartList[index].children
			},
			//点击商品跳转商品列表
			goGoodsList(item) {
				uni.navigateTo({
					url: "/subpkg/goods_list/goods_list?cid=" + item
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		display: flex;

		.left-scroll {
			width: 25%;

			.left-item {
				height: 80rpx;
				text-align: center;
				line-height: 80rpx;
				font-size: 12px;
				background-color: #f7f7f7;
				position: relative;
			}

			.active {
				background-color: #ffffff;
				font-weight: bold;
				font-size: 13px;

				&::before {
					content: ' ';
					display: block;
					width: 3px;
					height: 30px;
					background-color: blue;
					position: absolute;
					left: 0;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}

		.right-scroll {
			width: 75%;

			.title {
				font-size: 15px;
				color: blue;
				font-weight: bold;
				text-align: center;
				padding: 15px 0;
			}

			.box {
				display: flex;
				flex-wrap: wrap;

				.item {
					width: 33.33%;
					display: flex;
					flex-direction: column;
					align-items: center;
					font-size: 12px;

					image {
						width: 60px;
						height: 60px;
					}
				}
			}
		}
	}
</style>
