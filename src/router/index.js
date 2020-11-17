import Vue from 'vue'
import VueRouter from 'vue-router'
import Create from '../views/Create.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Modify from '../views/Modify.vue'
import Registered from '../views/Registered.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/*',
    name: 'Home',
    redirect: '/home'
  },
  {
    path: '/create',
    name: 'Create',
    component: () => import(/* webpackChunkName: "about" */ '../views/Create.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/modify',
    name: 'Modify',
    component: () => import(/* webpackChunkName: "about" */ '../views/Modify.vue')
  },
  {
    path: '/registered',
    name: 'Registered',
    component: () => import(/* webpackChunkName: "about" */ '../views/Registered.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
