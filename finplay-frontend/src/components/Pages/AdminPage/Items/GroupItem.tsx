import { FC } from "react";
import { IGroup } from "../../../../utils/interfaces";
import ControlItem from "./Control/ControlItem";
import classes from "./Item.module.css";

interface AdminItemProps {
  item: IGroup;
}

const AdminItem: FC<AdminItemProps> = ({ item }) => {
  return (
    <div key={item.id} className={classes.content}>
      <button
        className={classes.content__button}
        onClick={() => console.log(item)}
      >
        <div className={classes.content__logo}>
          <img
            className={classes.content__img}
            src={"/img/greentube.png"}
            alt="cover"
          />
        </div>
      </button>
      <div className={classes.content__title}>{item.name}</div>
      <ControlItem divClass={[classes.content__control]} />
    </div>
  );
};

export default AdminItem;
