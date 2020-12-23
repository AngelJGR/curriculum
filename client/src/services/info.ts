import Axios from 'axios'

export default {
  getInformation: (username: string) => {
    return Axios.get(`${username}`)
  }
}