<template>
	<view class="nav-bar">
		<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
			@buttonClick="buttonClick" />
	</view>
</template>

<script>
	import {
		mapGetters
	} from "vuex"
	export default {
		name: "nav-bottom-bar",
		data() {
			return {
				options: [{
					icon: 'shop',
					text: '店铺',
					infoBackgroundColor: '#ff0000',
					infoColor: "red"
				}, {
					icon: 'cart',
					text: '购物车',
					info: ""
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			};
		},
		computed: {
			...mapGetters("m_cart", ["total"])
		},
		methods: {
			onClick(e) {
				//判断是否点击的是购物车按钮
				if (e.content.text === "购物车") {
					uni.switchTab({
						url: "/pages/cart/cart"
					})
				}
			},
			buttonClick(e) {
				if (e.content.text === "加入购物车") {
					this.options[1].info++
					this.$emit("btnClick", e)
				}
			}
		},
		watch: {
			total: {
				immediate: true,
				handler: function(all) {
					this.options[1].info = all
				}
			}
		}
	}
</script>

<style lang="scss">
	.nav-bar {
		// 此处用sticky更好，不会覆盖住商品详情
		position: sticky;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 100;
	}
</style>
