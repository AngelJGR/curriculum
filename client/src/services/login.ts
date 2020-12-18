import Axios from 'axios'

const baseUrl = 'http://localhost:4000'
export default {
  validateUser: (user: string) => {
    return Axios.get(`${baseUrl}/validateUser?user=${user}`)
  },
  registerUser: (fullname: string, user: string, password: string) => {
    return Axios.post(`${baseUrl}/registerUser`, {fullname, user, password})
  },
  login: (user: string, password: string) => {
    return Axios.post(`${baseUrl}/login`, {user, password})
  }
}