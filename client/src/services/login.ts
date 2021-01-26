import Axios from 'axios'
const prefix = 'auth'

export default {
  validateUser: (username: string) => {
    return Axios.get(`${prefix}/validateUser/${username}`)
  },
  registerUser: (fullname: string, user: string, password: string) => {
    return Axios.post(`${prefix}/registerUser`, {fullname, user, password})
  },
  login: (user: string, password: string) => {
    return Axios.post(`${prefix}/login`, {user, password})
  }
}