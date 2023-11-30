import Axios from 'axios'

export const BASE_URL =
  import.meta.env.VITE_BACKEND_URL ||
  'https://syt-backend-23c78b21fab4.herokuapp.com/'

const Client = Axios.create({ baseURL: BASE_URL })

Client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default Client
