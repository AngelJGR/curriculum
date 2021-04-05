import SessionState from '@/interfaces/session'
import Vue from 'vue'
import Vuex from 'vuex'

import session from './modules/session'

Vue.use(Vuex)

const state: {
  session: SessionState;
} = { session: { token: '', user: {} } }

export default new Vuex.Store({
  state,
  modules: {
    session
  }
})
