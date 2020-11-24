import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)


const routes = [{
        path: '/create',
        name: 'Create',
        meta: {
            requireAuth: true,
        },
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Create.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Login.vue')
    },
    {
        path: '/modify',
        name: 'Modify',
        meta: {
            requireAuth: true,
        },
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Modify.vue')
    },
    {
        path: '/registered',
        name: 'Registered',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Registered.vue')
    },
    {
        path: '/report',
        name: 'Report',
        meta: {
            roles: ["1"],
            requireAuth: true,
        },
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Report.vue')
    },
    {
        path: '/userIssueList',
        name: 'UserIssueList',
        meta: {

            requireAuth: true,
        },
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/UserIssueList.vue')
    },
    {
        path: '/inquireList',
        name: 'InquireList',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../components/InquireList.vue')
    },
    {
        path: '/',
        name: 'Home',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Home.vue')
    },
    {
        path: '/manage',
        name: 'Manage',
        meta: {
            requireAuth: true,
        },
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Manage.vue')
    },
    {
        path: '/managecopy',
        name: 'ManageCopy',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/ManageCopy.vue')
    },
    {
        path: '/showDeatail',
        name: 'showDeatail',
        meta: {
            requireAuth: true,
        },
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/showDeatail.vue')
    }


]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router