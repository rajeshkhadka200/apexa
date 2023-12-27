import axios from "axios";
const api_url = "http://localhost:3000/api";
const instance = axios.create({
  baseURL: api_url,
  timeout: 10 * 60 * 1000,
});

export default instance;
