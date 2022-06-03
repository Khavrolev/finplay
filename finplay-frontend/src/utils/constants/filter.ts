import { SelectionGroups, SortingType } from "../enums/filter";
import { isSortingAZ, isSortingNewest, isSortingZA } from "../filter";
import { FilterProps } from "../interfaces/filter";

export const SORTING_TYPE = [
  { id: SortingType.AZ, name: "A-Z", func: isSortingAZ },
  { id: SortingType.ZA, name: "Z-A", func: isSortingZA },
  { id: SortingType.Newest, name: "Newest", func: isSortingNewest },
];
export const EMPTY_FILTER: FilterProps = {
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
