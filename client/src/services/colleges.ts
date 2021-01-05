import Axios from 'axios'

export default {
  getColleges: () => {
    return Axios.get(`/getColleges`)
  }
}