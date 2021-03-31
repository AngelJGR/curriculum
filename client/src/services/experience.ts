import { Experience } from '../interfaces/experience'
import Axios from 'axios'

const prefix = 'experience'
export default {
  getExperiences: () => {
    return Axios.get(`${prefix}/getExperiences`)
  },
  getOrganizations: (text: string) => {
    return Axios.post(`${prefix}/getOrganizations`, { text })
  },
  setExperience: (data: Experience) => {
    return Axios.post(`${prefix}/setExperience`, { ...data })
  },
  unsetExperience: (id: number) => {
    return Axios.delete(`${prefix}/unsetExperience/${id}`)
  }
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