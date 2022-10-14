import axios from 'axios';
import {MAIN_URL} from '../constants';

const api = axios.create({
  baseURL: MAIN_URL,
  headers: {
    'Content-type': 'application/json',
    // 'Access-Control-Allow-Origin': '*',
  },
});

export default api;
