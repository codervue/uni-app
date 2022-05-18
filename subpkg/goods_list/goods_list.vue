<template>
	<view class="goods-list">
		<goods_list-item v-for="(item,index) in goodsList" :key="index" @click.native="itemClick(item.goods_id)" :item="item"
			:isShowRadio="isShowRadio"></goods_list-item>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj: {
					//搜索值
					query: "",
					//分类id
					cid: "",
					//页码
					pagenum: 1,
					//数据条数
					pagesize: 10
				},
				goodsList: [],
				total: 0,
				//默认空图片
				isLoading: false,
				//是否显示勾选按钮
				isShowRadio: false
			}
		},
		onLoad(options) {
			//加载时传参数
			this.queryObj.query = options.query || ""
			this.queryObj.cid = options.cid || ""
			this.getGoodsList()
		},
		methods: {
			// 获取商品列表数据的方法
			async getGoodsList() {
				this.isLoading = true
				// 发起请求
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
				if (res.meta.status !== 200) return uni.$showMsg()
				//下拉拼接页码数据
				this.goodsList = [...this.goodsList, ...res.message.goods]
				this.total = res.message.total
				this.isLoading = false
			},
			//点击商品跳转到商品详情
			itemClick(id) {
				uni.navigateTo({
					url: "/subpkg/goods_detail/goods_detail?goods_id=" + id
				})
			}
		},
		// 上拉触底的事件
		onReachBottom() {
			// 判断是否还有下一页数据
			if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('没有多余宝贝了哦！')
			//节流处理，防止用户频繁请求数据
			if (!this.isLoading) {
				// 页码值+1
				this.queryObj.pagenum += 1
				// 加载下一页数据获取列表数据
				this.getGoodsList()
			}
		},
	}
</script>

<style lang="scss">
</style>
