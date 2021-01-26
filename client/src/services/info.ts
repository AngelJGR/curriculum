import Axios from 'axios'
const prefix = 'resume'

export default {
  getInformation: (username: string) => {
    return Axios.get(`${prefix}/${username}`)
  }
}