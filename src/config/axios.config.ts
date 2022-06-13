import axios from 'axios';

const baseAxios = axios.create({
  baseURL: 'https://music-api.vercel.app',
  timeout: 10000
})

export default baseAxios