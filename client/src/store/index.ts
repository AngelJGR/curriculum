import SessionState from '@/interfaces/session'
import Vue from 'vue'
import Vuex from 'vuex'

import session from './modules/session'
import alert from './modules/alert'
import AlertInterface from '@/interfaces/alert'

Vue.use(Vuex)

const state: {
  session: SessionState;
  alert?: AlertInterface;
} = { session: { token: '', user: {} } }

export default new Vuex.Store({
  state,
  modules: {
    session,
    alert
  }
})
