import classNames from "classnames";
import { observer } from "mobx-react-lite";
import { FC, useCallback, useContext, useState } from "react";
import Context from "../../../context";
import { SORTING_TYPE } from "../../../utils/constants/filter";
import { isFiltredGame } from "../../../utils/filter";
import { IDiv } from "../../../utils/interfaces/components";
import { IGame } from "../../../utils/interfaces/gameData";
import Filter from "./Filter/Filter";
import classes from "./UserPage.module.css";

declare module "csstype" {
  interface Properties {
    "--sliderValue"?: number;
  }
}

const UserPage: FC<IDiv> = ({ divClass }) => {
  const { store } = useContext(Context);

  const [columnsCounter, setColumnsCounter] = useState(2);

  const getFiltredGames = useCallback(() => {
    return store.games.filter((game) =>
      isFiltredGame(store.groups, game, store.filter),
    );
  }, [store.filter, store.games, store.groups]);

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
        style={{ "--sliderValue": columnsCounter }}
        className={classNames(classes.userpage__games, classes.games)}
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
