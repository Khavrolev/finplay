import { SelectionGroups, Sorting } from "./enums";
import { IFilter } from "./interfaces";

export const API_URL = "http://localhost:4000";
export const LOCAL_STORAGE_TOKEN_NAME = "finplay-token";
export const DELAY_DEBOUNCE = 500;

export const EMPTY_FILTER: IFilter = {
  game: "",
  groups: {},
  providers: {},
  sorting: Sorting.AZ,
};

export const SELECTION_GROUPS = {
  [SelectionGroups.GameName]: {
    title: "Search",
  },
  [SelectionGroups.Providers]: {
    title: "Providers",
  },
  [SelectionGroups.GameGroups]: {
    title: "Game groups",
  },
  [SelectionGroups.Sorting]: {
    title: "Sorting",
  },
};
