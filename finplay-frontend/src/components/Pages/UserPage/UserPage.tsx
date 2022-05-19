import classNames from "classnames";
import { FC } from "react";
import { IDiv } from "../../../utils/interfaces";
import Filter from "./Filter/Filter";
import classes from "./UserPage.module.css";

const UserPage: FC<IDiv> = ({ divClass }) => {
  return (
    <div className={classNames(divClass, classes.userpage)}>
      <Filter divClass={classes.userpage__filter} />
      <div className={classNames(classes.userpage__games, classes.games)}>
        Игры
      </div>
    </div>
  );
};

export default UserPage;
