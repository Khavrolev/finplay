import axios from "axios";
import { makeAutoObservable } from "mobx";
import AuthService from "../services/authService";
import UserService from "../services/dataService";
import { API_URL, LOCAL_STORAGE_TOKEN_NAME } from "../utils/constants/common";
import POPUP_CLOSED from "../utils/constants/components";
import { EMPTY_FILTER } from "../utils/constants/filter";
import { IPopup } from "../utils/interfaces/components";
import { IFilter } from "../utils/interfaces/filter";
import {
  CreateGroup,
  IGame,
  IGameProvider,
  IGroup,
} from "../utils/interfaces/gameData";
import { AuthResponse, IUser } from "../utils/interfaces/user";
import { UserEndpoints } from "../utils/enums/fetchData";

export default class Store {
  user: IUser | undefined = undefined;

  loading = false;

  initialized = false;

  games: IGame[] = [];

  groups: IGroup[] = [];

  providers: IGameProvider[] = [];

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

  setGames(data: IGame[]) {
    this.games = data;
  }

  setGroups(data: IGroup[]) {
    this.groups = data;
  }

  setProviders(data: IGameProvider[]) {
    this.providers = data;
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
      const response = await axios.get<AuthResponse>(
        `${API_URL}${UserEndpoints.Refresh}`,
        {
          withCredentials: true,
        },
      );
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

      const { games, groups, providers } = response.data;
      this.setGames(games);
      this.setGroups(groups);
      this.setProviders(providers);
    } catch (error) {
      console.error(error);
    } finally {
      this.setLoading(false);
    }
  }

  async createGroup(addingGroup: CreateGroup) {
    this.setLoading(true);
    try {
      const response = await UserService.createGroup(addingGroup);
      const group = response.data;
      console.log(group);
      this.setGroups([...this.groups, group]);
    } catch (error) {
      console.error(error);
    } finally {
      this.setLoading(false);
    }
  }
}
