export interface GameProps {
  id: number;
  name: string;
  date: Date;
  provider: number;
  cover: string;
  coverLarge: string;
}

export interface GroupProps {
  id: number;
  name: string;
  games: number[];
}

export interface GameProviderProps {
  id: number;
  name: string;
  logo: string;
}
export interface GameData {
  games: GameProps[];
  groups: GroupProps[];
  providers: GameProviderProps[];
}

export interface CreateGroup {
  name: string;
  games: number[];
}

export interface DeleteGroup {
  movingGroupId: number;
}

export interface DeletedGroupResponse {
  groupDeleted: GroupProps;
  groupUpdated?: GroupProps;
}
