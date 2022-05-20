import { SortingType } from "./enums";

export interface IDiv {
  divClass: string;
}

export interface IUser {
  userName: string;
  adminRole: boolean;
}

export interface AuthResponse {
  token: string;
  user: IUser;
}

export interface IGame {
  id: number;
  name: string;
  date: Date;
  provider: number;
  group: number;
  cover: string;
  coverLarge: string;
}

export interface IGroup {
  id: number;
  name: string;
  games: number[];
}

export interface IGameProvider {
  id: number;
  name: string;
  logo: string;
}
export interface GameData {
  games: IGame[];
  groups: IGroup[];
  providers: IGameProvider[];
}

export interface IKey {
  [key: number]: boolean;
}

export interface IFilter {
  gameName: string;
  groups: IKey;
  providers: IKey;
  sorting: SortingType;
}
