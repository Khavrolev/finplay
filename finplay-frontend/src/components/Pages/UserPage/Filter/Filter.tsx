import classNames from "classnames";
import { observer } from "mobx-react-lite";
import { ChangeEvent, FC, useContext, useState } from "react";
import Context from "../../../../context";
import {
  EMPTY_FILTER,
  SELECTION_GROUPS,
} from "../../../../utils/constants/filter";
import { SelectionGroups } from "../../../../utils/enums/filter";
import { HTMLElementProps } from "../../../../utils/interfaces/components";
import { GameProps } from "../../../../utils/interfaces/gameData";
import classes from "./Filter.module.css";
import SelectionList from "./SelectionList/SelectionList";

const sliderSize = { min: 2, max: 4, width: 25, height: 25 };

interface FilterProps extends HTMLElementProps {
  countFiltredGames: number;
  columnsCounter: number;
  gamesInGroups: GameProps[];
  handleSliderChange: (columns: number) => void;
}

const Filter: FC<FilterProps> = ({
  countFiltredGames,
  columnsCounter,
  handleSliderChange,
  gamesInGroups,
  classname,
}) => {
  const { store } = useContext(Context);

  const [showFiltres, setShowFiltres] = useState(false);

  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    store.setFilter({ ...store.filter, gameName: event.target.value });
  };

  const getColumnsCounters = () => {
    const columns = [];
    for (let i = sliderSize.min; i <= sliderSize.max; i += 1) {
      columns.push(
        <div
          key={i}
          style={{
            left: `calc(100% - ${sliderSize.width}px - (${
              sliderSize.max - i
            } * (100% - ${sliderSize.width}px)/${
              sliderSize.max - sliderSize.min
            })`,
            width: sliderSize.width,
            lineHeight: `${sliderSize.height}px`,
          }}
          className={classNames(classes.filter__columnscounter, {
            [classes.filter__columnscounter_filled]: i <= columnsCounter,
          })}
        >
          {i}
        </div>,
      );
    }

    return columns;
  };

  const sliderLength =
    (100 * (columnsCounter - sliderSize.min)) /
    (sliderSize.max - sliderSize.min);

  return (
    <div className={classNames(classname, classes.filter)}>
      <div className={classNames(classes.filter__search, classes.search)}>
        <input
          value={store.filter.gameName}
          className={classes.search__input}
          placeholder={SELECTION_GROUPS[SelectionGroups.GameName].title}
          onChange={handleChangeSearch}
        ></input>
        <div className={classes.search__icon}></div>
      </div>
      <div
        className={classNames(classes.filter__selectors, {
          [classes.filter_mobilehidden]: !showFiltres,
        })}
      >
        <SelectionList
          type={SelectionGroups.Providers}
          gamesInGroups={gamesInGroups}
          classname={classes.filter__selector}
        />
        <SelectionList
          type={SelectionGroups.GameGroups}
          classname={classes.filter__selector}
        />
        <SelectionList
          type={SelectionGroups.Sorting}
          classname={classes.filter__selector}
        />
        <div
          className={classNames(
            classes.filter__columns,
            classes.filter_mobilehidden,
          )}
        >
          <div className={classes.filter__columnsheader}>Columns</div>
          <input
            style={{
              background: `linear-gradient(
            to right,
            #fdbc11 0%,
            #fdbc11 ${sliderLength}%,
            #f2f2f2 ${sliderLength}%,
            #f2f2f2 100%
          )`,
            }}
            className={classes.filter__columnslider}
            type="range"
            value={columnsCounter}
            onChange={(event) => handleSliderChange(+event.target.value)}
            min={sliderSize.min}
            max={sliderSize.max}
          />
          {getColumnsCounters()}
        </div>
        <div className={classes.filter__info}>
          <div
            className={classes.filter__counter}
          >{`Games amount: ${countFiltredGames}`}</div>
          <button
            className={classes.filter__resetbutton}
            onClick={() => store.setFilter(EMPTY_FILTER)}
          >
            Reset
          </button>
        </div>
      </div>
      <button
        className={classNames(
          classes.filter__showbutton,
          classes.showbutton,
          classes.filter_pchidden,
        )}
        onClick={() => setShowFiltres(!showFiltres)}
      >
        <div className={classes.showbutton__icon}></div>
        <div className={classes.showbutton__text}>
          {showFiltres ? "Hide filtres" : "Show filtres"}
        </div>
      </button>
    </div>
  );
};

export default observer(Filter);
