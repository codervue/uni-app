<template>
	<view class="cart">
		<view class="title">
			<uni-icons type="shop" size="18"></uni-icons>
			<!-- 描述文本 -->
			<text class="cart-title-text">购物车({{total}})</text>
		</view>
		<!-- 商品列表 -->
		<view class="goods-list" v-if="cart.length !== 0">
			<block v-for="(item,index) in cart" :key="index">
				<uni-swipe-action>
					<uni-swipe-action-item>
						<goods_list-item :item="item" :isShowRadio="isShowRadio">
						</goods_list-item>
						<template v-slot:right>
							<view class="slot-button" @click="swipeActionClickHandler(item.goods_id)">
								<text class="slot-button-text">删除</text>
							</view>
						</template>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</block>
		</view>
		<!-- 空白购物车区域 -->
		<view class="empty-cart" v-else>
			<view class="top">
				<image src="/static/icon/empty.png" class="empty-img"></image>
			</view>
			<view class="bottom">
				<text class="tip-text">空空如也~</text>
			</view>
		</view>
		<!-- 结算框 -->
		<count-total></count-total>
		<!-- 占位 -->
		<view class="setter">
			
		</view>
	</view>
</template>

<script>
	import badge from "@/mixin/tabbar-badge.js"
	import {
		mapState,
		mapMutations
	} from "vuex"
	export default {
		mixins: [badge],
		data() {
			return {
				isShowRadio: true,
			}
		},
		computed: {
			...mapState("m_cart", ["cart"])
		},
		methods: {
			...mapMutations("m_cart", ["removeGoods"]),
			//删除商品
			swipeActionClickHandler(id) {
				this.removeGoods(id)
			}
		}
	}
</script>
<!-- scoped解决样式重名问题 -->
<style lang="scss" scoped="scoped">
	.title {
		text-align: center;
		border-bottom: solid 1px #e5e5e5;
		padding: 10px 0;
	}

	.slot-button {
		background-color: #C00000;
		width: 70px;
		display: flex;
		justify-content: center;
		align-items: center;

		text {
			color: #fff;
		}
	}

	.empty-cart {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 150px;

		.top image {
			width: 90px;
			height: 90px;
		}

		.bottom {
			text {
				font-size: 12px;
				color: gray;
			}
		}
	}
	.setter{
		height: 50px;
	}
</style>
