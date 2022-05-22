import classNames from "classnames";
import { observer } from "mobx-react-lite";
import { FC, useCallback, useContext, useState } from "react";
import Context from "../../../context";
import { SORTING_TYPE } from "../../../utils/constants";
import { isFiltredGame } from "../../../utils/filter";
import { IDiv, IGame } from "../../../utils/interfaces";
import Filter from "./Filter/Filter";
import classes from "./UserPage.module.css";

const UserPage: FC<IDiv> = ({ divClass }) => {
  const { store } = useContext(Context);

  const [columnsCounter, setColumnsCounter] = useState(2);
  console.log(columnsCounter);

  const getFiltredGames = useCallback(() => {
    if (!store.gameData?.games) {
      return [];
    }

    return store.gameData.games.filter((game) =>
      isFiltredGame(game, store.filter),
    );
  }, [store.filter, store.gameData]);

  const filtredGames = getFiltredGames();

  const sortGames = (prev: IGame, cur: IGame) => {
    const sortingFunc = SORTING_TYPE[store.filter.sorting].func;

    if (sortingFunc(prev, cur)) {
      return 1;
    }

    return -1;
  };

  return (
    <div className={classNames(divClass, classes.userpage)}>
      <Filter
        divClass={classes.userpage__filter}
        countFiltredGames={filtredGames.length}
        columnsCounter={columnsCounter}
        handleSliderChange={setColumnsCounter}
      />
      <div
        className={classNames(classes.userpage__games, classes.games, {
          [classes.userpage__games_column3]: columnsCounter === 3,
          [classes.userpage__games_column4]: columnsCounter === 4,
        })}
      >
        {filtredGames.sort(sortGames).map((game) => (
          <button
            key={game.id}
            className={classes.userpage__game}
            onClick={() => console.log(game)}
          >
            <img
              className={classes.userpage__img}
              src={game.cover}
              alt="cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default observer(UserPage);
