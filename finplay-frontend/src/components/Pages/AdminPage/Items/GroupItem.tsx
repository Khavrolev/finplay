import classNames from "classnames";
import { FC, memo, useContext } from "react";
import Context from "../../../../context";
import { GroupProps } from "../../../../utils/interfaces/gameData";
import ControlItem from "./Control/ControlItem";
import classes from "./Item.module.css";

interface GroupItemProps {
  item: GroupProps;
}

const GroupItem: FC<GroupItemProps> = memo(({ item }) => {
  const { store } = useContext(Context);

  const getCovers = () => {
    if (item.games.length === 0) {
      return <div className={classes.content__nogames}></div>;
    }

    const covers = [];

    for (let i = 0; i < 3 && i < item.games.length; i += 1) {
      covers.push(
        <div
          key={item.games[i]}
          style={{
            backgroundImage: `url(${
              store.games.find((game) => game.id === item.games[i])?.cover
            })`,
          }}
          className={classNames(
            classes.content__logo,
            classes.content__logo_game,
          )}
        />,
      );
    }

    return covers;
  };

  return (
    <div className={classes.content}>
      <button
        className={classes.content__button}
        onClick={() => console.log(item)}
      >
        {getCovers()}
      </button>
      <div className={classes.content__title}>{item.name}</div>
      <ControlItem id={item.id} classname={classes.content__control} />
    </div>
  );
});

export default GroupItem;
