import axios from "axios";

export let baseURL = "https://f186-103-166-172-229.ngrok-free.app";

const API = axios.create({ baseURL }, { withCredentials: true });

API.interceptors.request.use(
  (req) => {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default API;