import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import $ from 'jquery'
import 'bootstrap'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import global from './common.vue'
import qs from 'qs';
import Axios from 'axios'

Vue.prototype.$qs = qs;
Vue.prototype.COMMON = global
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(ElementUI)
    // Vue.prototype.$msgbox = MessageBox;
    // Vue.prototype.$confirm = MessageBox.confirm;
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        if (store.state.token) {
            next();
            // let role = store.state.user.role;
            // if (to.meta.roles.includes(role)) {
            //     next();
            // } else {
            //     next({
            //         path: '/',
            //     })
            // }
        } else {
            next({
                path: '/login',
            })
        }
    } else {
        next();
    }
})

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

Axios.defaults.withCredentials = true;