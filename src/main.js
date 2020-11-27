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

import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer)
Viewer.setDefaults({
    Options: { 'inline': true, 'button': true, 'navbar': true, 'title': true, 'toolbar': true, 'tooltip': true, 'movable': true, 'zoomable': true, 'rotatable': true, 'scalable': true, 'transition': true, 'fullscreen': true, 'keyboard': true, 'url': 'data-source' }
})

Vue.prototype.$qs = qs;
Vue.prototype.COMMON = global
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(ElementUI)
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        if (store.state.token) {
            next();
            let role = store.state.role;
            debugger
            if (to.meta.roles.includes(role)) {
                next();
            } else {
                window.sessionStorage.clear();
                next({
                    path: '/login',
                })
                alert("您没权限访问该网页，请重新登录");
            }
        } else {
            next({
                path: '/login',
            })
            alert("您未登录，请登录");
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