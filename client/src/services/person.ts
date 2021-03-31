import Axios from 'axios'
import { Person } from '@/interfaces/person'

const prefix = 'person'

export default {
  getPerson: () => {
    return Axios.get(`${prefix}/getPerson`)
  },
  updatePerson: (data: Person) => {
    return Axios.post(`${prefix}/updatePerson`, { data })
  }
}