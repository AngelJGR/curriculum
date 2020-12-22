import Axios from 'axios'

const baseUrl = 'http://localhost:4000'
export default {
  getInformation: (username: string) => {
    return Axios.get(`${baseUrl}/${username}`)
  }
}