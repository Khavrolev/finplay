import { SortingType } from "../enums/filter";

export interface IKey {
  [key: number]: boolean;
}

export interface IFilter {
  gameName: string;
  groups: IKey;
  providers: IKey;
  sorting: SortingType;
}
