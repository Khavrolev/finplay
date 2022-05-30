import axios from "axios";
import { makeAutoObservable } from "mobx";
import AuthService from "../services/authService";
import DataService from "../services/dataService";
import POPUP_CLOSED from "../utils/constants/components";
import { EMPTY_FILTER } from "../utils/constants/filter";
import { IPopup } from "../utils/interfaces/components";
import { IFilter } from "../utils/interfaces/filter";
import {
  CreateGroup,
  DeletedGroupResponse,
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
      localStorage.setItem(
        `${process.env.REACT_APP_LOCAL_STORAGE_TOKEN_NAME}`,
        response.data.token,
      );
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
      localStorage.removeItem(
        `${process.env.REACT_APP_LOCAL_STORAGE_TOKEN_NAME}`,
      );
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
        `${process.env.REACT_APP_API_URL}${UserEndpoints.Refresh}`,
        {
          withCredentials: true,
        },
      );
      localStorage.setItem(
        `${process.env.REACT_APP_LOCAL_STORAGE_TOKEN_NAME}`,
        response.data.token,
      );
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
      const response = await DataService.getGameData();

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

  async createGroup(addingGroup: CreateGroup): Promise<IGroup | undefined> {
    let group: IGroup | undefined;

    this.setLoading(true);
    try {
      const response = await DataService.createGroup(addingGroup);
      group = response.data;

      this.setGroups([...this.groups, group]);
    } catch (error) {
      console.error(error);
    } finally {
      this.setLoading(false);
    }

    return group;
  }

  async updateGroup(updatingGroup: IGroup): Promise<IGroup | undefined> {
    let group: IGroup | undefined;

    this.setLoading(true);
    try {
      const response = await DataService.updateGroup(updatingGroup);
      group = response.data;

      this.setGroups(
        this.groups.map((item) => (item.id === group?.id ? group : item)),
      );
    } catch (error) {
      console.error(error);
    } finally {
      this.setLoading(false);
    }

    return group;
  }

  async deleteGroup(
    deletingGroupId: number,
    movingGroupId: number,
  ): Promise<DeletedGroupResponse | undefined> {
    let groups: DeletedGroupResponse | undefined;

    this.setLoading(true);
    try {
      const response = await DataService.deleteGroup(
        deletingGroupId,
        movingGroupId,
      );
      groups = response.data;
      this.setGroups(
        this.groups
          .filter((item) => item.id !== groups?.groupDeleted.id)
          .map((item) =>
            item.id === groups?.groupUpdated?.id ? groups.groupUpdated : item,
          ),
      );
    } catch (error) {
      console.error(error);
    } finally {
      this.setLoading(false);
    }

    return groups;
  }
}
