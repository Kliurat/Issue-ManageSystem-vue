import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')) : {
        token: false,
        user: {
            username: "",
            loginID: "",
            email: "",
        },
    },
    mutations: {
        setToken(state, msg) {
            state.token = msg;
        },
        setUser(state, user) {
            state.user = user;
        }
    },
    actions: {},
    modules: {}
})