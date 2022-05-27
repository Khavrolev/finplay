import classNames from "classnames";
import { observer } from "mobx-react-lite";
import { FC, useContext } from "react";
import Context from "../../../context";
import { ActionType } from "../../../utils/enums/components";
import { IDiv } from "../../../utils/interfaces/components";
import classes from "./AdminPage.module.css";
import GameItem from "./Items/GameItem";
import GroupItem from "./Items/GroupItem";
import ProviderItem from "./Items/ProviderItem";

const AdminPage: FC<IDiv> = ({ divClass }) => {
  const { store } = useContext(Context);

  const handleAddGroup = () => {
    store.setPopup({ type: ActionType.Add, modalOpened: true, id: -1 });
  };

  return (
    <div className={classNames(divClass, classes.adminpage)}>
      <div className={classes.adminpage__block}>
        <div className={classes.adminpage__title}>
          <div className={classes.adminpage__text}>Groups</div>
          <button
            className={classes.adminpage__addbutton}
            onClick={handleAddGroup}
          ></button>
        </div>
        <div className={classes.adminpage__content}>
          {store.groups.map((item) => (
            <GroupItem key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className={classes.adminpage__block}>
        <div className={classes.adminpage__title}>
          <div className={classes.adminpage__text}>Games</div>
        </div>
        <div className={classes.adminpage__content}>
          {store.games.map((item) => (
            <GameItem key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className={classes.adminpage__block}>
        <div className={classes.adminpage__title}>
          <div className={classes.adminpage__text}>Providers</div>
        </div>
        <div className={classes.adminpage__content}>
          {store.providers.map((item) => (
            <ProviderItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default observer(AdminPage);
