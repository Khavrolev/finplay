import axios from "axios";
import { makeAutoObservable } from "mobx";
import AuthService from "../services/authService";
import UserService from "../services/dataService";
import { API_URL, LOCAL_STORAGE_TOKEN_NAME } from "../utils/constants/common";
import POPUP_CLOSED from "../utils/constants/components";
import { EMPTY_FILTER } from "../utils/constants/filter";
import { IPopup } from "../utils/interfaces/components";
import { IFilter } from "../utils/interfaces/filter";
import { GameData } from "../utils/interfaces/gameData";
import { AuthResponse, IUser } from "../utils/interfaces/user";

export default class Store {
  user: IUser | undefined = undefined;

  loading = false;

  initialized = false;

  gameData: GameData | undefined = undefined;

  filter = EMPTY_FILTER;

  popup = POPUP_CLOSED;

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

  setPopup(data: IPopup) {
    this.popup = data;
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
