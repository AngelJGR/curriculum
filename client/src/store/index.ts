import Vue from 'vue'
import Vuex from 'vuex'

import SessionState from '@/interfaces/state/session'
import AlertInterface from '@/interfaces/state/alert'

import session from './modules/session'
import alert from './modules/alert'

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
