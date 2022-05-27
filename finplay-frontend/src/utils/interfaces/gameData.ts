export interface ILogin {
  userName: string;
  password: string;
}

export interface IGame {
  id: number;
  name: string;
  date: Date;
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

export interface CreateGroup {
  name: string;
  games: number[];
}

export interface DeleteGroup {
  movingGroupId: number;
}

export interface DeletedGroupResponse {
  groupDeleted: IGroup;
  groupUpdated?: IGroup;
}
