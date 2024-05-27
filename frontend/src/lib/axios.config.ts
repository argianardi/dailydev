import axios from 'axios';

const appAxios = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    Accept: 'application/json',
  },
});

export default appAxios;
