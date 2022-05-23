import classNames from "classnames";
import { FC } from "react";
import { IDiv } from "../../../../../utils/interfaces";
import classes from "./Control.module.css";

interface ControlButtonProps extends IDiv {
  name: string;
}

const ControlButton: FC<ControlButtonProps> = ({ name, divClass }) => {
  return (
    <button className={classes.control__action}>
      <div className={classNames(classes.control__icon, divClass[0])}></div>
      <div className={classNames(classes.control__text, divClass[1])}>
        {name}
      </div>
    </button>
  );
};

export default ControlButton;
