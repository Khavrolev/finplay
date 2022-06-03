import { SortingType } from "../enums/filter";

export interface KeyProps<T> {
  [key: number]: T;
}

export interface FilterProps {
  gameName: string;
  groups: KeyProps<boolean>;
  providers: KeyProps<boolean>;
  sorting: SortingType;
}
