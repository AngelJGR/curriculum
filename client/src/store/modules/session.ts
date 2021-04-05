import login from '../../services/login'
import ICommit from '../../interfaces/commit'

const baseState = {
  user: {},
  token: ''
}

const actions = {
  login ({commit}: ICommit, { username, password}: any) {
    return login.login(username, password)
      .then((session) => {
        localStorage.setItem('resume-token', session.data.token)
        if (session.data.success) {
          commit('setSession', session)
        }
        return session
      })
  }
}

const mutations = {
  setSession (state: any, session: any) {
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