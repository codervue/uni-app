<template>
	<view>
		<uni-search-bar :radius="100" @input="input" clearButton="auto" placeholder="请输入搜索内容" cancelButton="none" focus="true">
		</uni-search-bar>
		<view class="sug" v-for="(item,index) in searchResults" :key="index" @click="goDetail(item.goods_id)">
			<view class="sug-item">
				{{item.goods_name}}
			</view>
			<view class="icon">
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: null,
				searchResults: []
			};
		},
		methods: {
			input(e) {
				//防抖处理
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.getSearchList(e)
				}, 500)
			},
			async getSearchList(e) {
				// 判断搜索关键词是否为空
				if (e === '') {
					this.searchResults = []
					return
				}
				// 发起请求，获取搜索建议列表
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/qsearch', {
					query: e
				})
				if (res.meta.status !== 200) return uni.$showMsg()
				this.searchResults = res.message
			},
			//点击商品跳转
			goDetail(item){
				uni.navigateTo({
					url:"/subpkg/goods_detail/goods_detail?goods_id="+item
				})
			}
		}
	}
</script>

<style lang="scss">
	.sug {
		display: flex;
		justify-content: space-between;

		.sug-item {
			font-size: 12px;
			border-bottom: 1px solid #efefef;
			white-space: nowrap;
			// 溢出部分隐藏
			overflow: hidden;
			// 文本溢出后，使用 ... 代替
			text-overflow: ellipsis;
			padding: 15px 2px;
			margin-left: 10px;
		}

		.icon {
			line-height: 47px;
		}
	}
</style>
