import axios from "axios";
import { makeAutoObservable } from "mobx";
import AuthService from "../services/authService";
import { API_URL, LOCAL_STORAGE_TOKEN_NAME } from "../utils/constants";
import { AuthResponse, IUser } from "../utils/interfaces";

export default class Store {
  user = null as IUser | null;

  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(user: IUser | null) {
    this.user = user;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  async login(userName: string, password: string) {
    this.setLoading(true);
    try {
      const response = await AuthService.login(userName, password);
      localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.token);
      this.setUser(response.data.user);
    } catch (error) {
      console.error(error);
    } finally {
      this.setLoading(false);
    }
  }

  async logout() {
    this.setLoading(true);
    try {
      await AuthService.logout();
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      this.setUser(null);
    } catch (error) {
      console.error(error);
    } finally {
      this.setLoading(false);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.token);
      this.setUser(response.data.user);
    } catch (error) {
      console.error(error);
    } finally {
      this.setLoading(false);
    }
  }
}
