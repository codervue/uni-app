// #ifndef VUE3
import Vue from 'vue'
import store from "./store/index"
//导入封装好的网络请求包
import {
	$http
} from '@escook/request-miniprogram'
//挂在到全局使用
uni.$http = $http
//配置请求根路径
$http.baseUrl = 'https://www.uinav.com'
//请求前配置加载效果
$http.beforeRequest = function(options) {
	uni.showLoading({
		title: '正在加载数据...',
	})
}
// 请求完成之后清除加载效果
$http.afterRequest = function () {
  uni.hideLoading()
}
// 封装全局展示消息提示的方法
uni.$showMsg = function (title = '数据加载失败！', duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: 'none',
  })
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
