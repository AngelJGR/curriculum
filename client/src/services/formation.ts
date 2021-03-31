import Axios from 'axios'

const prefix = 'formation'
export default {

  getFormation: () => {
    return Axios.get(`${prefix}/getFormation`)
  },
  /* getColleges: () => {
    return Axios.get(`${prefix}/getColleges`)
  }, */
  getCollegeDregrees: (text: string) => {
    return Axios.post(`${prefix}/getCollegeDregrees`, { text })
  },
  setFormation: (idCollegeDegree: number, idCollege: number) => {
    return Axios.post(`${prefix}/setFormation`, { idCollegeDegree, idCollege })
  },
  unsetFormation: (id: number) => {
    return Axios.delete(`${prefix}/unsetFormation/${id}`)
  }
}