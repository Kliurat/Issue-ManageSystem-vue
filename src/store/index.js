import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')) : {
        token: false,
        role: "",
        user: {
            username: "",
            loginID: "",
            email: "",
            role: "",
        },
    },
    mutations: {
        setToken(state, msg) {
            state.token = msg;
        },
        setUser(state, user) {
            state.user = user;
        },
        setRole(state, msg) {
            state.role = msg
        },
    },
    actions: {},
    modules: {}
})