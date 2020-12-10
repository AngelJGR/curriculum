import Axios from 'axios'

const baseUrl = 'http://localhost:4000'
export default {
    validateUser: (user: string) => {
        return Axios.get(`${baseUrl}/validateUser?user=${user}`)
    },
    registerUser: (fullName: string, user: string, password: string) => {
        return Axios.post(`${baseUrl}/registerUser`, {fullName, user, password})
    }
}