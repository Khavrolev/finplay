import classNames from "classnames";
import debounce from "lodash.debounce";
import { observer } from "mobx-react-lite";
import { ChangeEvent, FC, useContext, useState } from "react";
import Context from "../../../../context";
import {
  DELAY_DEBOUNCE,
  EMPTY_FILTER,
  SELECTION_GROUPS,
} from "../../../../utils/constants";
import { SelectionGroups } from "../../../../utils/enums";
import { IDiv } from "../../../../utils/interfaces";
import classes from "./Filter.module.css";
import SelectionList from "./SelectionList/SelectionList";

interface FilterProps extends IDiv {
  countFiltredGames: number;
}

const Filter: FC<FilterProps> = ({ countFiltredGames, divClass }) => {
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
          onChange={(event) => {
            handleChangeSearch(event);
          }}
        ></input>
        <div className={classes.search__icon}></div>
      </div>
      <div
        className={classNames(classes.filter__selectors, {
          [classes.filter__selectors_hidden]: !showFiltres,
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
        className={classNames(classes.filter__showbutton, classes.showbutton)}
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
