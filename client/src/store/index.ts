import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    fullname: null,
    token: null
  },
  mutations: {
    setUser: (state, user) => {
      state.user= user
    },
    setFullname: (state, fullname) => {
      state.fullname= fullname
    },
    setToken: (state, token) => {
      state.token= token
    }
  },
  actions: {
  },
  modules: {
  }
})
