import classNames from "classnames";
import { FC, memo } from "react";
import { GameProps } from "../../../../utils/interfaces/gameData";
import classes from "./Item.module.css";

interface GameItemProps {
  item: GameProps;
}

const GameItem: FC<GameItemProps> = memo(({ item }) => {
  return (
    <div className={classes.content}>
      <button
        className={classes.content__button}
        onClick={() => console.log(item)}
      >
        <div
          key={item.id}
          style={{
            backgroundImage: `url(${item.cover})`,
          }}
          className={classNames(
            classes.content__logo,
            classes.content__logo_game,
          )}
        />
      </button>
      <div className={classes.content__title}>{item.name}</div>
    </div>
  );
});

export default GameItem;
