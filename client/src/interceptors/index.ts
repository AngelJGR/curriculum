import axios, { AxiosError, AxiosRequestConfig } from 'axios'

export default () => {
  const addToken: any = {
    success: (config: AxiosRequestConfig): AxiosRequestConfig => {
      const token: string | null = localStorage.getItem('token')
      if (token != null) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    }
  }
  axios.interceptors.request.use(addToken.success)
}