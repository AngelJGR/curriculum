import { AxiosError, AxiosResponse } from 'axios'
import router from '../router'

type Dictionary<T> = { [key: string]: T }

export default {
  success: (config: AxiosResponse) => config,
  error: (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      const params: Dictionary<string> = {
        show: 'true',
        message: `Error ${error.response.status}: ${error.response.statusText}`,
        color: 'error'
      }
      router.push({name: 'Login', params})
    }
    return Promise.reject(error)
  }
}