import Vue from 'vue'
import App from './App'
import request from 'utils/request.js'
import moment from 'moment'
// import cuCustom from 'colorui/components/cu-custom.vue'

moment.locale('zh-cn');
Vue.config.productionTip = false
// Vue.component('cu-custom',cuCustom)
Vue.prototype.$request = request
Vue.prototype.$moment = moment;

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
