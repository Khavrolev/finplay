import axios from "axios";
import { makeAutoObservable } from "mobx";
import AuthService from "../services/authService";
import UserService from "../services/dataService";
import {
  API_URL,
  EMPTY_FILTER,
  LOCAL_STORAGE_TOKEN_NAME,
} from "../utils/constants";
import { AuthResponse, GameData, IFilter, IUser } from "../utils/interfaces";

export default class Store {
  user: IUser | undefined = undefined;

  loading = false;

  initialized = false;

  gameData: GameData | undefined = undefined;

  filter = EMPTY_FILTER;

  modalOpened = false;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(user: IUser | undefined) {
    this.user = user;
  }

  setLoading(bool: boolean) {
    this.loading = bool;
  }

  setInitialized(bool: boolean) {
    this.initialized = bool;
  }

  setGameData(data: GameData | undefined) {
    this.gameData = data;
  }

  setFilter(data: IFilter) {
    this.filter = data;
  }

  setModalOpened(bool: boolean) {
    this.modalOpened = bool;
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
      this.setUser(undefined);
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

  async getGameData() {
    this.setLoading(true);
    try {
      const response = await UserService.getGameData();
      console.log(response.data);
      this.setGameData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      this.setLoading(false);
    }
  }
}
