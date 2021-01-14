import Axios from 'axios'

const prefix = 'skills'
export default {
  getSkillsPerson: (idPerson: number) => {
    return Axios.get(`${prefix}/getSkillsPerson/${idPerson}`)
  },
  getSkills: (idPerson: number, text: string) => {
    return Axios.post(`${prefix}/getSkills`, { text, idPerson })
  },
  setSkill: (idPerson: number, idSkill: number, score: number) => {
    return Axios.post(`${prefix}/setSkill`, {idPerson, idSkill, score})
  }
}