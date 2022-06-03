import classNames from "classnames";
import { FC } from "react";
import { HTMLElementProps } from "../../utils/interfaces/components";
import classes from "./Logo.module.css";

const Logo: FC<HTMLElementProps> = ({ classname }) => {
  return <div className={classNames(classname, classes.logo)}></div>;
};

export default Logo;
