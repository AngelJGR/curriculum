import Axios from 'axios'
const prefix = 'person'

export default {
  getPerson: (userId: number) => {
    return Axios.get(`${prefix}/getPerson/${userId}`)
  },
  updatePerson: (id: number, data: Record<string, any>) => {
    return Axios.post(`${prefix}/updatePerson/${id}`, { data })
  }
}