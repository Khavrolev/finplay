import { IFilter, IGame } from "./interfaces";

// eslint-disable-next-line import/prefer-default-export
export const isFiltredGame = (game: IGame, filter: IFilter) => {
  const gameName = game.name
    .toLowerCase()
    .includes(filter.gameName.toLowerCase());

  if (!gameName) {
    return false;
  }

  const filtredProviders = Object.keys(filter.providers);

  const providers =
    filtredProviders.length === 0 || filter.providers[game.provider];

  if (!providers) {
    return false;
  }

  const filtredGroups = Object.keys(filter.groups);

  const groups = filtredGroups.length === 0 || filter.groups[game.group];

  return groups;
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
