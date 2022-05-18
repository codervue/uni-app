<template>
	<view class="my-container">
		<login v-if="!token"></login>
		<user-info v-else></user-info>
	</view>
</template>

<script>
	import badge from "@/mixin/tabbar-badge.js";
	import {mapState} from "vuex"
	export default {
		mixins: [badge],
		data() {
			return {
			}
		},
		computed:{
			...mapState("m_user",["token"])
		},
		methods: {
		}
	}
</script>

<style>
.my-container {
  height: 100%;
}
</style>
