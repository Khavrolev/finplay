import classNames from "classnames";
import { observer } from "mobx-react-lite";
import { FC, useContext } from "react";
import Context from "../../../context";
import { ActionType } from "../../../utils/enums/components";
import { IDiv } from "../../../utils/interfaces/components";
import classes from "./AdminPage.module.css";
import GroupItem from "./Items/GroupItem";

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
          {store.gameData?.groups.map((item) => (
            <GroupItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default observer(AdminPage);
