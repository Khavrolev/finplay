import classNames from "classnames";
import { FC, memo } from "react";
import { IGameProvider } from "../../../../utils/interfaces/gameData";
import classes from "./Item.module.css";

interface ProviderItemProps {
  item: IGameProvider;
}

const ProviderItem: FC<ProviderItemProps> = memo(({ item }) => {
  return (
    <div className={classes.content}>
      <button
        className={classes.content__button}
        onClick={() => console.log(item)}
      >
        <div className={classes.content__provider}>
          <div
            key={item.id}
            style={{
              backgroundImage: `url(/img/${item.logo})`,
            }}
            className={classNames(
              classes.content__logo,
              classes.content__logo_provider,
            )}
          />
        </div>
      </button>
      <div className={classes.content__title}>{item.name}</div>
    </div>
  );
});

export default ProviderItem;
