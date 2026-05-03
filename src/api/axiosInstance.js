import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Api-Key': import.meta.env.VITE_API_KEY 
  }
});


api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("Global API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);


export default api;