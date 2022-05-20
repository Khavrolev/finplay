import { SelectionGroups, SortingType } from "./enums";
import { isSortingAZ, isSortingNewest, isSortingZA } from "./filter";
import { IFilter } from "./interfaces";

export const API_URL = "http://localhost:4000";
export const LOCAL_STORAGE_TOKEN_NAME = "finplay-token";
export const DELAY_DEBOUNCE = 500;

export const SORTING_TYPE = [
  { id: SortingType.AZ, name: "A-Z", func: isSortingAZ },
  { id: SortingType.ZA, name: "Z-A", func: isSortingZA },
  { id: SortingType.Newest, name: "Newest", func: isSortingNewest },
];
export const EMPTY_FILTER: IFilter = {
  gameName: "",
  groups: {},
  providers: {},
  sorting: 0,
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
