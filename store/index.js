//vuex根目录文件
import Vue from "vue"
import Vuex from "vuex"
import moduelCart from "./cart.js"
import moduelUser from "./user.js"

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		m_cart: moduelCart,
		m_user: moduelUser
	}
})


export default store
