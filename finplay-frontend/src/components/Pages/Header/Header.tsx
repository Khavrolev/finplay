import classNames from "classnames";
import { FC, useContext } from "react";
import Context from "../../../context";
import { IDiv } from "../../../utils/interfaces/components";
import Logo from "../../Logo/Logo";
import classes from "./Header.module.css";

const Header: FC<IDiv> = ({ divClass }) => {
  const { store } = useContext(Context);

  return (
    <div className={classNames(divClass, classes.header)}>
      <Logo divClass={classes.header__logo} />
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

export default Header;
