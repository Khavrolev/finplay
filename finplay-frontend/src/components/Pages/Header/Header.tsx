import classNames from "classnames";
import { observer } from "mobx-react-lite";
import { FC, useContext } from "react";
import Context from "../../../context";
import { HTMLElementProps } from "../../../utils/interfaces/components";
import Logo from "../../Logo/Logo";
import classes from "./Header.module.css";

const Header: FC<HTMLElementProps> = ({ classname }) => {
  const { store } = useContext(Context);

  return (
    <div className={classNames(classname, classes.header)}>
      <Logo classname={classes.header__logo} />
      <button
        className={classNames(classes.header__logout, classes.logout)}
        onClick={() => store.logout()}
      >
        <div className={classes.logout__icon}></div>
        <div className={classes.logout__text}>Logout</div>
      </button>
    </div>
  );
};

export default observer(Header);
