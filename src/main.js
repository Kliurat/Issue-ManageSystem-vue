import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import $ from 'jquery'
import 'bootstrap'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import global from './common.vue'
import qs from 'qs';
Vue.prototype.$qs = qs;
Vue.prototype.COMMON = global
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)


Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')