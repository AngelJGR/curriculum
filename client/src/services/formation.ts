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
  setFormation: (idPerson: number, idCollegeDegree: number, idCollege: number) => {
    return Axios.post(`${prefix}/setFormation`, { idPerson, idCollegeDegree, idCollege })
  },
  unsetFormation: (id: number) => {
    return Axios.delete(`${prefix}/unsetFormation/${id}`)
  }
}