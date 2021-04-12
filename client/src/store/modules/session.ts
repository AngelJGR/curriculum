import LoginService from '../../services/login'
import ICommit from '../../interfaces/commit'
import SessionState from '@/interfaces/state/session'

const TOKEN_KEY = 'resume-token'
const USER_KEY = 'resume-user'

const baseState: SessionState = {
  user: JSON.parse(localStorage.getItem(USER_KEY) || '{}'),
  token: (localStorage.getItem(TOKEN_KEY) || '')
}

const actions = {
  login ({commit}: ICommit, { username, password }: any) {
    return LoginService.login(username, password)
      .then((session) => {
        if (session.data.success) {
          localStorage.setItem(TOKEN_KEY, session.data.token)
          localStorage.setItem(USER_KEY, JSON.stringify(session.data.body))
          commit('setSession', session)
        }
        return session
      })
  },
  logout ({commit}: ICommit) {
    return LoginService.logout()
      .then((res) => {
        if (res.data.success) {
          localStorage.removeItem(TOKEN_KEY)
          localStorage.removeItem(USER_KEY)
          commit('clearSession')
        }
        return res
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