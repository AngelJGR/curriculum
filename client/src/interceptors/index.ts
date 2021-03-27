import axios from 'axios'
import addToken from './addToken'
import unauthorized from './unauthorized'

export default () => {
  axios.interceptors.request.use(addToken.success, addToken.error)
  axios.interceptors.response.use(unauthorized.success, unauthorized.error)
}