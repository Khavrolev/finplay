import classNames from "classnames";
import { observer } from "mobx-react-lite";
import { FC, useContext } from "react";
import Context from "../../../../../context";
import {
  SELECTION_GROUPS,
  SORTING_TYPE,
} from "../../../../../utils/constants/filter";
import { SelectionGroups } from "../../../../../utils/enums/filter";
import { IDiv } from "../../../../../utils/interfaces/components";
import { IKey } from "../../../../../utils/interfaces/filter";
import { IGame } from "../../../../../utils/interfaces/gameData";
import classes from "./SelectionList.module.css";

interface SelectionListProps extends IDiv {
  type: SelectionGroups;
  gamesInGroups?: IGame[];
}

const SelectionList: FC<SelectionListProps> = ({
  type,
  gamesInGroups,
  divClass,
}) => {
  const { store } = useContext(Context);

  const getItems = () => {
    switch (type) {
      case SelectionGroups.Providers:
        const usedProviders = gamesInGroups?.reduce((acc, item) => {
          if (acc[item.provider]) {
            acc[item.provider] += 1;
          } else {
            acc[item.provider] = 1;
          }
          return acc;
        }, {} as IKey<number>);

        return {
          data: store.providers.filter(
            (item) => usedProviders && usedProviders[item.id],
          ),
          filterType: store.filter.providers,
        };
      case SelectionGroups.GameGroups:
        return {
          data: store.groups.filter((item) => item.games.length > 0),
          filterType: store.filter.groups,
        };
      case SelectionGroups.Sorting:
        return {
          data: SORTING_TYPE,
          filterType: { [store.filter.sorting]: true },
        };
      default:
        return { data: [], filterType: {} };
    }
  };

  const items = getItems();

  const switchFilterItem = (id: number) => {
    const filter = { ...items.filterType };
    if (filter[id]) {
      delete filter[id];
    } else {
      filter[id] = true;
    }

    return filter;
  };

  const handleClick = (id: number) => {
    switch (type) {
      case SelectionGroups.Providers:
        store.setFilter({ ...store.filter, providers: switchFilterItem(id) });
        break;
      case SelectionGroups.GameGroups:
        store.setFilter({ ...store.filter, groups: switchFilterItem(id) });
        break;
      case SelectionGroups.Sorting:
        store.setFilter({ ...store.filter, sorting: id });
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
