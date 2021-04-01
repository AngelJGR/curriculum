
import { AxiosError, AxiosRequestConfig } from 'axios'

export default {
  success: (config: AxiosRequestConfig): AxiosRequestConfig => {
    const token: string | null = localStorage.getItem('resume-token')
    if (token != null) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error: (err: AxiosError) => Promise.reject(err)
}