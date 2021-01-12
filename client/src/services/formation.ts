import Axios from 'axios'

const prefix = 'formation'
export default {

  getFormation: (userId: number) => {
    return Axios.get(`${prefix}/getFormation/${userId}`)
  },
  /* getColleges: () => {
    return Axios.get(`${prefix}/getColleges`)
  }, */
  getCollegeDregrees: (text: string) => {
    return Axios.post(`${prefix}/getCollegeDregrees`, { text })
  },
  setCollegeDegree: (idPerson: number, idCollegeDegree: number, idCollege: number) => {
    return Axios.post(`${prefix}/setCollegeDegree`, { idPerson, idCollegeDegree, idCollege })
  }
}