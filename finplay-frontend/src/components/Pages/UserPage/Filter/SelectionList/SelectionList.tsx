import classNames from "classnames";
import { observer } from "mobx-react-lite";
import { FC, useContext } from "react";
import Context from "../../../../../context";
import { SELECTION_GROUPS } from "../../../../../utils/constants";
import { SelectionGroups } from "../../../../../utils/enums";
import { IDiv } from "../../../../../utils/interfaces";
import classes from "./SelectionList.module.css";

interface SelectionListProps extends IDiv {
  type: SelectionGroups;
}

const SelectionList: FC<SelectionListProps> = ({ type, divClass }) => {
  const { store } = useContext(Context);

  const getItems = () => {
    if (!store.gameData) {
      return { data: [], filterType: {} };
    }

    switch (type) {
      case SelectionGroups.Providers:
        return {
          data: store.gameData.providers,
          filterType: store.filter.providers,
        };
      case SelectionGroups.GameGroups:
        return { data: store.gameData.groups, filterType: store.filter.groups };
      default:
        return { data: [], filterType: {} };
    }
  };

  const items = getItems();

  const handleClick = (id: number) => {
    const filter = { ...items.filterType };
    if (filter[id]) {
      delete filter[id];
    } else {
      filter[id] = true;
    }

    switch (type) {
      case SelectionGroups.Providers:
        store.setFilter({ ...store.filter, providers: filter });
        break;
      case SelectionGroups.GameGroups:
        store.setFilter({ ...store.filter, groups: filter });
        break;
      default:
        break;
    }
  };

  return (
    <div className={classNames(divClass, classes.selector)}>
      <div className={classes.selector__title}>
        {SELECTION_GROUPS[type].title}
      </div>
      <div className={classes.selector__items}>
        {items.data.map((item) => (
          <button
            key={item.id}
            className={classNames(classes.selector__item, {
              [classes.selector__item_selected]: items.filterType[item.id],
            })}
            onClick={() => handleClick(item.id)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default observer(SelectionList);
