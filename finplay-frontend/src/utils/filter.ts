import { IFilter, IKey } from "./interfaces/filter";
import { IGame, IGroup } from "./interfaces/gameData";

export const getGamesInGroups = (games: IGame[], groups: IGroup[]) => {
  const gamesIdsInGroups = [
    ...new Set(
      groups.reduce((acc, item) => [...acc, ...item.games], [] as number[]),
    ),
  ];

  const gamesAsObject = games.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {} as IKey<IGame>);

  return gamesIdsInGroups.map((item) => gamesAsObject[item]);
};

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

export const getFiltredGames = (
  games: IGame[],
  groups: IGroup[],
  filter: IFilter,
) => {
  return games.filter((game) => isFiltredGame(groups, game, filter));
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
