import classNames from "classnames";
import debounce from "lodash.debounce";
import { observer } from "mobx-react-lite";
import { ChangeEvent, FC, useContext, useState } from "react";
import Context from "../../../../context";
import { DELAY_DEBOUNCE } from "../../../../utils/constants/common";
import {
  EMPTY_FILTER,
  SELECTION_GROUPS,
} from "../../../../utils/constants/filter";
import { SelectionGroups } from "../../../../utils/enums/filter";
import { IDiv } from "../../../../utils/interfaces/components";
import classes from "./Filter.module.css";
import SelectionList from "./SelectionList/SelectionList";

const sliderSize = { min: 2, max: 4, width: 25, height: 25 };

interface FilterProps extends IDiv {
  countFiltredGames: number;
  columnsCounter: number;
  handleSliderChange: (columns: number) => void;
}

const Filter: FC<FilterProps> = ({
  countFiltredGames,
  columnsCounter,
  handleSliderChange,
  divClass,
}) => {
  const { store } = useContext(Context);

  const [showFiltres, setShowFiltres] = useState(false);

  const handleChangeSearch = debounce(
    (event: ChangeEvent<HTMLInputElement>) => {
      store.setFilter({ ...store.filter, gameName: event.target.value });
    },
    DELAY_DEBOUNCE,
  );

  return (
    <div className={classNames(divClass, classes.filter)}>
      <div className={classNames(classes.filter__search, classes.search)}>
        <input
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
          divClass={classes.filter__selector}
        />
        <SelectionList
          type={SelectionGroups.GameGroups}
          divClass={classes.filter__selector}
        />
        <SelectionList
          type={SelectionGroups.Sorting}
          divClass={classes.filter__selector}
        />
        <div
          className={classNames(
            classes.filter__columns,
            classes.filter_mobilehidden,
          )}
        >
          <div className={classes.filter__columnsheader}>Columns</div>
          <input
            className={classes.filter__columnslider}
            type="range"
            value={columnsCounter}
            onChange={(event) => handleSliderChange(+event.target.value)}
            min={sliderSize.min}
            max={sliderSize.max}
          />
          <div
            style={{
              left: `calc(100% - ${sliderSize.width}px - (${
                sliderSize.max - columnsCounter
              } * (100% - ${sliderSize.width}px)/${
                sliderSize.max - sliderSize.min
              })`,
              width: sliderSize.height,
              lineHeight: `${sliderSize.height}px`,
            }}
            className={classes.filter__columnscounter}
          >
            {columnsCounter}
          </div>
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
