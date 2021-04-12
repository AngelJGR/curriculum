import Vue from 'vue'
import Vuex from 'vuex'

import State from '@/interfaces/state/state'

import session from './modules/session'
import alert from './modules/alert'

Vue.use(Vuex)

const state: State = { session: { token: '', user: {} } }

export default new Vuex.Store({
  state,
  modules: {
    session,
    alert
  }
})
