import Axios from 'axios'

const prefix = 'skills'
export default {
  getSkills: (idPerson: number) => {
    return Axios.get(`${prefix}/getSkills/${idPerson}`)
  },
  setSkill: () => {
    return Axios.post(`${prefix}/getSkills`)
  }
}