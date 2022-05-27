import { IFilter } from "./interfaces/filter";
import { IGame, IGroup } from "./interfaces/gameData";

export const isFiltredGame = (
  groups: IGroup[],
  game: IGame,
  filter: IFilter,
) => {
  const gameNameIncludes = game.name
    .toLowerCase()
    .includes(filter.gameName.toLowerCase());

  if (!gameNameIncludes) {
    return false;
  }

  const filtredProviders = Object.keys(filter.providers);

  const providersIncludes =
    filtredProviders.length === 0 || filter.providers[game.provider];

  if (!providersIncludes) {
    return false;
  }

  const filtredGroups = Object.keys(filter.groups);

  const groupsIncludes =
    filtredGroups.length === 0 ||
    groups.reduce(
      (acc, item) =>
        acc || (filter.groups[item.id] && item.games.includes(game.id)),
      false as boolean,
    );

  return groupsIncludes;
};

export const isSortingAZ = (prev: IGame, cur: IGame) => {
  return prev.name.toLowerCase() > cur.name.toLowerCase();
};

export const isSortingZA = (prev: IGame, cur: IGame) => {
  return prev.name.toLowerCase() < cur.name.toLowerCase();
};

export const isSortingNewest = (prev: IGame, cur: IGame) => {
  return prev.date < cur.date;
};
