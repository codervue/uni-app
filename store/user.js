export default {
	namespaced: true,
	state: () => ({
		token: "",
		userInfo: ""
	}),


	mutations: {
		// 更新用户的基本信息
		updateUserInfo(state, userinfo) {
			state.userInfo = userinfo
		},
		//更新token
		updateToken(state, token) {
			state.token = token
		}
	}
}
