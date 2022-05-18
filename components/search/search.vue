<template>
	<view @click="goSearch" class="search">
		<view class="search-box">
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "search",
		data() {
			return {

			};
		},
		methods: {
			goSearch() {
				uni.navigateTo({
					url: "/subpkg/search/search"
				})
			}
		}
	}
</script>

<style lang="scss">
.search{
	background-color: #fff;
	height: 56px;
	display: flex;
	align-items: center;
	padding: 0 10px;
	.search-box{
		width: 100%;
		background-color: #F8F8F8;
		border-radius:20px;
		height: 35px;
		line-height: 35px;
		text-align: center;
		color: #666;
		display: flex;
		flex-direction: row;
		justify-content: center;
		font-size: 15px;
	}
}
</style>
