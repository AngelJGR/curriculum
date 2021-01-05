import Axios from 'axios'

const prefix = 'formation'
export default {

  getFormation: (userId: number) => {
    return Axios.get(`${prefix}/getFormation/${userId}`)
  },
  getColleges: () => {
    return Axios.get(`${prefix}/getColleges`)
  }
}