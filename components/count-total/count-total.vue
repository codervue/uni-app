<template>
	<view class="count">
		<view class="left">
			<view class="radio" @click="radioClick">
				<radio color="#C00000" :checked="checkedAll"></radio>
			</view>
			<view class="all">
				全选
			</view>
		</view>
		<view class="center">
			合计:￥{{totalPrice}}
		</view>
		<view class="right" @click="settleClick">
			结算({{checkCount}})
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapState,
		mapMutations
	} from "vuex"
	export default {
		name: "count-total",
		data() {
			return {

			};
		},
		computed: {
			...mapGetters("m_cart", ["checkCount", "totalPrice"]),
			...mapState("m_cart", ["cart"]),
			...mapState("m_user", ["token"]),
			//全选辅助函数
			checkedAll() {
				// if (this.cart.length === 0) return false;
				return !this.cart.find((item) => !item.goods_state);
			}
		},
		methods: {
			...mapMutations("m_cart", ["allChecked"]),
			radioClick() {
				this.allChecked(!this.checkedAll)
			},
			//结算点击
			settleClick() {
				//判断用户是否勾选商品
				if (!this.checkCount) return uni.$showMsg("请勾选需结算的商品")
				//判断用户是否已登陆
				if (!this.token) return uni.$showMsg("请登录")
			}
		}
	}
</script>

<style lang="scss">
	.count {
		position: fixed;
		height: 50px;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 100;
		background-color: #fff;
		border-top: solid 1px #e5e5e5;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.left {
			display: flex;
			flex-direction: row;

			.all {
				margin-top: 3px;
			}
		}

		.right {
			width: 30%;
			height: 100%;
			background-color: #C00000;
			text-align: center;
			line-height: 50px;
		}
	}
</style>
