import Axios from 'axios'

export default {
  validateUser: (username: string) => {
    return Axios.get(`validateUser/${username}`)
  },
  registerUser: (fullname: string, user: string, password: string) => {
    return Axios.post(`registerUser`, {fullname, user, password})
  },
  login: (user: string, password: string) => {
    return Axios.post(`login`, {user, password})
  }
}