import { Sorting } from "./enums";

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
  provider: number;
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
  [key: string]: boolean;
}

export interface IFilter {
  game: string;
  groups: IKey;
  providers: IKey;
  sorting: Sorting;
}
