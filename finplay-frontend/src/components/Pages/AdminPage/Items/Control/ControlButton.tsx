import classNames from "classnames";
import { FC } from "react";
import { ActionPopupType } from "../../../../../utils/enums/components";
import { IDiv } from "../../../../../utils/interfaces/components";
import classes from "./Control.module.css";

interface ControlButtonProps extends IDiv {
  name: string;
  type: ActionPopupType;
}

const ControlButton: FC<ControlButtonProps> = ({ name, type }) => {
  return (
    <button className={classes.control__action}>
      <div
        className={classNames(
          classes.control__icon,
          classes[`control__icon_${type}`],
        )}
      ></div>
      <div
        className={classNames(
          classes.control__text,
          classes[`control__text_${type}`],
        )}
      >
        {name}
      </div>
    </button>
  );
};

export default ControlButton;
