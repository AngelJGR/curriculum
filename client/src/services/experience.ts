import Axios from 'axios'

const prefix = 'experience'
export default {
  getExperience: (idPerson: number) => {
    return Axios.get(`${prefix}/getExperience/${idPerson}`)
  },
  /* getSkills: (idPerson: number, text: string) => {
    return Axios.post(`${prefix}/getSkills`, { text, idPerson })
  },
  setSkill: (idPerson: number, idSkill: number, score: number) => {
    return Axios.post(`${prefix}/setSkill`, { idPerson, idSkill, score })
  },
  unsetSkill: (id: number) => {
    return Axios.delete(`${prefix}/unsetSkill/${id}`)
  } */
}