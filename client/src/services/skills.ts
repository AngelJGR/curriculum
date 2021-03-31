import Axios from 'axios'

const prefix = 'skills'
export default {
  getSkillsPerson: () => {
    return Axios.get(`${prefix}/getSkillsPerson`)
  },
  getSkills: (text: string) => {
    return Axios.post(`${prefix}/getSkills`, { text })
  },
  setSkill: (idSkill: number, score: number) => {
    return Axios.post(`${prefix}/setSkill`, { idSkill, score })
  },
  unsetSkill: (id: number) => {
    return Axios.delete(`${prefix}/unsetSkill/${id}`)
  }
}