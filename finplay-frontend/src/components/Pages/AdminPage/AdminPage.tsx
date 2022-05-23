import classNames from "classnames";
import { observer } from "mobx-react-lite";
import { FC, useContext } from "react";
import Context from "../../../context";
import { IDiv } from "../../../utils/interfaces";
import classes from "./AdminPage.module.css";
import AdminItem from "./Items/GroupItem";

const AdminPage: FC<IDiv> = ({ divClass }) => {
  const { store } = useContext(Context);

  return (
    <div className={classNames(divClass[0], classes.adminpage)}>
      <div className={classes.adminpage__block}>
        <div className={classes.adminpage__title}>
          <div className={classes.adminpage__text}>Groups</div>
          <button className={classes.adminpage__addbutton}></button>
        </div>
        <div className={classes.adminpage__content}>
          {store.gameData?.groups.map((item) => (
            <AdminItem item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default observer(AdminPage);
