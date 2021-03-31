import Axios from 'axios'
const prefix = 'person'

export default {
  getPerson: () => {
    return Axios.get(`${prefix}/getPerson`)
  },
  updatePerson: (data: Record<string, any>) => {
    return Axios.post(`${prefix}/updatePerson`, { data })
  }
}