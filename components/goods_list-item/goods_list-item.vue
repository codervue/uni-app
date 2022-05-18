<template>
	<view class="goods-box">
		<view class="check" @click="radioClickHandler(item.goods_id)" v-if="isShowRadio">
			<radio :checked="item.goods_state" color="#C00000"></radio>
		</view>
		<view class="goods-img">
			<img :src="item.goods_small_logo || defaultPic" alt="">
		</view>
		<view class="goods-right">
			<view class="goods-title">
				{{item.goods_name}}
			</view>
			<view class="goods-price">
				<view class="price">
					￥{{item.goods_price | tofixed}}
				</view>
				<view class="num-box" v-if="isShowRadio">
					<uni-number-box :min="1" :value="item.goods_count" @change="numberChangeHandler">
					</uni-number-box>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from "vuex"
	export default {
		name: "goods_list-item",
		props: {
			item: {
				type: Object,
				default () {
					return {}
				}
			},
			isShowRadio: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
			};
		},
		methods: {
			//映射辅助函数
			...mapMutations("m_cart", ["changeState", "changeNumBox"]),
			//check点击
			radioClickHandler(id) {
				this.changeState(id)
			},
			//计数框点击
			numberChangeHandler(e) {
				const goods = {
					goods_id: this.item.goods_id,
					goods_count: e
				}
				this.changeNumBox(goods)
			}
		},
		filters: {
			// 把数字处理为带两位小数点的数字
			tofixed(num) {
				return Number(num).toFixed(2)
			}
		},
	}
</script>

<style lang="scss" scoped="scoped">
	.goods-box {
		display: flex;
		height: 100px;
		border-bottom: 1px solid #f0f0f0;

		.check {
			line-height: 100px;
		}

		// justify-content: space-between;
		.goods-img img {
			width: 100px;
			height: 100px;
		}

		.goods-right {
			padding: 0 5px;
			display: flex;
			flex-direction: column;
			justify-content: space-around;

			.goods-title {
				font-size: 13px;
			}

			.goods-price {
				display: flex;
				justify-content: space-between;

				.price {
					font-size: 16px;
					color: #c00000;
				}
			}
		}
	}
</style>
