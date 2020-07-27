import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		allPrice:0
	},
	mutations:{
		updatePrice(state,allPrice){
			state.allPrice = allPrice
		}
	}
})

export default store
