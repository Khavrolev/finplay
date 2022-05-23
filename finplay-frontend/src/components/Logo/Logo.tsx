import classNames from "classnames";
import { FC } from "react";
import { IDiv } from "../../utils/interfaces";
import classes from "./Logo.module.css";

const Logo: FC<IDiv> = ({ divClass }) => {
  return <div className={classNames(divClass[0], classes.logo)}></div>;
};

export default Logo;
