import axios from "axios";
const api_url = import.meta.env.VITE_API_URL;
const instance = axios.create({
  baseURL: api_url,
  timeout: 10 * 60 * 1000,
});

export default instance;
