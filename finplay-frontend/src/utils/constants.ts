import { SelectionGroups } from "./enums";
import { isSortingAZ, isSortingNewest, isSortingZA } from "./filter";
import { IFilter } from "./interfaces";

export const API_URL = "http://localhost:4000";
export const LOCAL_STORAGE_TOKEN_NAME = "finplay-token";
export const DELAY_DEBOUNCE = 500;

export const SORTING_TYPE = [
  { id: 0, name: "A-Z", func: isSortingAZ },
  { id: 1, name: "Z-A", func: isSortingZA },
  { id: 2, name: "Newest", func: isSortingNewest },
];
export const EMPTY_FILTER: IFilter = {
  gameName: "",
  groups: {},
  providers: {},
  sorting: { 0: true },
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
