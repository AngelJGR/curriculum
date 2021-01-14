import Axios from 'axios'

const prefix = 'skills'
export default {
  getSkillsPerson: (idPerson: number) => {
    return Axios.get(`${prefix}/getSkillsPerson/${idPerson}`)
  },
  getSkills: (text: string) => {
    return Axios.post(`${prefix}/getSkills`, { text })
  },
  setSkill: () => {
    return Axios.post(`${prefix}/getSkills`)
  }
}