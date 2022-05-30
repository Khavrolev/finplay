import classNames from "classnames";
import { observer } from "mobx-react-lite";
import { FC, useContext, useState } from "react";
import Context from "../../../context";
import { SORTING_TYPE } from "../../../utils/constants/filter";
import { isFiltredGame } from "../../../utils/filter";
import { IDiv } from "../../../utils/interfaces/components";
import { IKey } from "../../../utils/interfaces/filter";
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

  const filtredGames = store.games
    .filter((game) => isFiltredGame(store.groups, game, store.filter))
    .reduce((acc, item) => {
      acc[item.id] = true;
      return acc;
    }, {} as IKey);

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
        countFiltredGames={Object.keys(filtredGames).length}
        columnsCounter={columnsCounter}
        handleSliderChange={setColumnsCounter}
      />
      <div
        style={{ "--sliderValue": columnsCounter }}
        className={classNames(classes.userpage__games, classes.games)}
      >
        {store.games
          .slice()
          .sort(sortGames)
          .map((game) => (
            <button
              key={game.id}
              className={classNames(classes.userpage__game, {
                [classes.userpage__game_hidden]: !filtredGames[game.id],
              })}
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
