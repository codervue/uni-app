export default {
	// 为当前模块开启命名空间
	namespaced: true,

	// 模块的 state 数据
	state: () => ({
		// 购物车的数组，用来存储购物车中每个商品的信息对象
		// 每个商品的信息对象，都包含如下 6 个属性：
		// { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
		cart: [],
	}),

	// 模块的 mutations 方法
	mutations: {
		//加入购物车方法
		addToCart(state, payLoad) {
			//判断cart购物车中是否存在相同商品
			const result = state.cart.find((item) => item.goods_id === payLoad.goods_id)
			//如果存在,商品数量加一，否则添加到cart中
			if (result) {
				result.goods_count += 1
			} else {
				state.cart.push(payLoad)
			}
		},
		//修改勾选状态
		changeState(state, payLoad) {
			const result = state.cart.find((item) => item.goods_id === payLoad)
			if (result) {
				result.goods_state = !result.goods_state
			}
		},
		//修改计算框数量
		changeNumBox(state, payLoad) {
			const result = state.cart.find((item) => item.goods_id === payLoad.goods_id)
			if (result) {
				result.goods_count = payLoad.goods_count
			}
		},
		//删除商品
		removeGoods(state, payLoad) {
			state.cart = state.cart.filter(x => x.goods_id !== payLoad)
		},
		//全选反选
		allChecked(state,payLoad){
			state.cart.forEach(item=>item.goods_state = payLoad)
		}
	},

	// 模块的 getters 属性
	getters: {
		//统计购物车商品总数量
		total(state) {
			let all = 0
			state.cart.forEach((item) => all += item.goods_count)
			return all
		},
		//结算数量
		checkCount(state) {
			return state.cart.filter((item) => {
				return item.goods_state
			}).length
		},
		//选中商品总价格
		totalPrice(state) {
			return state.cart.filter((item) => {
					return item.goods_state;
				})
				.reduce((preValue, item) => {
					return preValue + item.goods_price * item.goods_count;
				}, 0)
				.toFixed(2)
		}
	},
}
