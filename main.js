import Vue from 'vue'
import App from './App'
import request from 'utils/request.js'
import moment from 'moment'
import store from './common/store'
// import cuCustom from 'colorui/components/cu-custom.vue'

moment.locale('zh-cn');
import uView from 'uview-ui';
Vue.use(uView);
Vue.config.productionTip = false
// Vue.component('cu-custom',cuCustom)
Vue.prototype.$request = request
Vue.prototype.$moment = moment;

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
