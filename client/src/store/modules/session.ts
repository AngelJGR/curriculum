import login from '../../services/login'
import ICommit from '../../interfaces/commit'
import SessionState from '@/interfaces/session'

const TOKEN_KEY = 'resume-token'
const USER_KEY = 'resume-user'

const baseState: SessionState = {
  user: JSON.parse(localStorage.getItem(USER_KEY) || '{}'),
  token: (localStorage.getItem(TOKEN_KEY) || '')
}

const actions = {
  login ({commit}: ICommit, { username, password }: any) {
    return login.login(username, password)
      .then((session) => {
        localStorage.setItem(TOKEN_KEY, session.data.token)
        localStorage.setItem(USER_KEY, JSON.stringify(session.data.body))
        if (session.data.success) {
          commit('setSession', session)
        }
        return session
      })
  }
}

const mutations = {
  setSession (state: SessionState, session: any) {
    state.user = session.data.body
    state.token = session.data.token
  },
  clearSession (state: any) {
    state.user = {}
    state.token = null
  }
}

export default {
  namespaced: true,
  state: baseState,
  actions,
  mutations
}