import classNames from "classnames";
import { observer } from "mobx-react-lite";
import { FC, useContext, useMemo, useState } from "react";
import Context from "../../../context";
import { SORTING_TYPE } from "../../../utils/constants/filter";
import { getFiltredGames, getGamesInGroups } from "../../../utils/filter";
import { HTMLElementProps } from "../../../utils/interfaces/components";
import { IGame } from "../../../utils/interfaces/gameData";
import Filter from "./Filter/Filter";
import classes from "./UserPage.module.css";

declare module "csstype" {
  interface Properties {
    "--sliderValue"?: number;
  }
}

const UserPage: FC<HTMLElementProps> = ({ classname }) => {
  const { store } = useContext(Context);

  const [columnsCounter, setColumnsCounter] = useState(2);

  const gamesInGroups = useMemo(
    () => getGamesInGroups(store.games, store.groups),
    [store.games, store.groups],
  );
  const filtredGames = getFiltredGames(
    gamesInGroups,
    store.groups,
    store.filter,
  );

  const sortGames = (prev: IGame, cur: IGame) => {
    const sortingFunc = SORTING_TYPE[store.filter.sorting].func;

    if (sortingFunc(prev, cur)) {
      return 1;
    }

    return -1;
  };

  return (
    <div className={classNames(classname, classes.userpage)}>
      <Filter
        classname={classes.userpage__filter}
        countFiltredGames={filtredGames.length}
        columnsCounter={columnsCounter}
        gamesInGroups={gamesInGroups}
        handleSliderChange={setColumnsCounter}
      />
      <div
        style={{ "--sliderValue": columnsCounter }}
        className={classNames(classes.userpage__games, classes.games)}
      >
        {filtredGames.sort(sortGames).map((game) => (
          <button
            key={game.id}
            className={classNames(classes.userpage__game)}
            onClick={() => console.log(game)}
          >
            <img
              className={classes.userpage__img}
              src={game.coverLarge}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = game.cover;
              }}
              alt="cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default observer(UserPage);
