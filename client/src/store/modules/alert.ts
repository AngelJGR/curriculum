
import Alert from '@/interfaces/state/alert'
import ICommit from '../../interfaces/commit'

interface MMutations {
  type: string;
  message: string;
}

const baseState: Alert = {
  show: false,
  color: '',
  message: ''
}

const actions = {
  success ({ commit }: ICommit, message: string) {
    commit('alert', { type: 'success', message })
    return
  },
  error ({ commit }: ICommit, message: string) {
    commit('alert', { type: 'error', message })
    return
  },
  warning ({ commit }: ICommit, message: string) {
    commit('alert', { type: 'warning', message })
    return
  }
}

const mutations = {
  alert (state: Alert, { type, message }: MMutations) {
    state.show = true
    state.color = type
    state.message = message
  }
}

export default {
  namespaced: true,
  state: baseState,
  actions,
  mutations
}
