import axios from "axios";

const $api = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL,
});

$api.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      `${process.env.REACT_APP_LOCAL_STORAGE_TOKEN_NAME}`,
    )}`;
  }
  return config;
});

export default $api;
