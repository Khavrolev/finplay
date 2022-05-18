import axios from "axios";
import { API_URL, LOCAL_STORAGE_TOKEN_NAME } from "../utils/constants";

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      LOCAL_STORAGE_TOKEN_NAME,
    )}`;
  }
  return config;
});

export default $api;
