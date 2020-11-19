import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
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
  {
    path: '/inquire',
    name: 'Inquire',
    component: () => import(/* webpackChunkName: "about" */ '../components/Inquire.vue')
  },
  {
    path: '/issuesList',
    name: 'IssuesList',
    component: () => import(/* webpackChunkName: "about" */ '../components/IssuesList.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/manage',
    name: 'Manage',
    component: () => import(/* webpackChunkName: "about" */ '../views/Manage.vue')
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
