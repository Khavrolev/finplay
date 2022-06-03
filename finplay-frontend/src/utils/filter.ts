import { FilterProps, KeyProps } from "./interfaces/filter";
import { GameProps, GroupProps } from "./interfaces/gameData";

export const getGamesInGroups = (games: GameProps[], groups: GroupProps[]) => {
  const gamesIdsInGroups = [
    ...new Set(
      groups.reduce((acc, item) => [...acc, ...item.games], [] as number[]),
    ),
  ];

  const gamesAsObject = games.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {} as KeyProps<GameProps>);

  return gamesIdsInGroups.map((item) => gamesAsObject[item]);
};

export const isFiltredGame = (
  groups: GroupProps[],
  game: GameProps,
  filter: FilterProps,
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
  games: GameProps[],
  groups: GroupProps[],
  filter: FilterProps,
) => {
  return games.filter((game) => isFiltredGame(groups, game, filter));
};

export const isSortingAZ = (prev: GameProps, cur: GameProps) => {
  return prev.name.toLowerCase() > cur.name.toLowerCase();
};

export const isSortingZA = (prev: GameProps, cur: GameProps) => {
  return prev.name.toLowerCase() < cur.name.toLowerCase();
};

export const isSortingNewest = (prev: GameProps, cur: GameProps) => {
  return prev.date < cur.date;
};
