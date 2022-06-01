import { SortingType } from "../enums/filter";

export interface IKey<T> {
  [key: number]: T;
}

export interface IFilter {
  gameName: string;
  groups: IKey<boolean>;
  providers: IKey<boolean>;
  sorting: SortingType;
}
