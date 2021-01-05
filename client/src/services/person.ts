import Axios from 'axios'
const prefix = 'person'

export default {
  getPerson: (userId: number) => {
    return Axios.get(`${prefix}/getPerson/${userId}`)
  }
}