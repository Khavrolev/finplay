import classNames from "classnames";
import { FC } from "react";
import ControlButton from "./ControlButton";
import classes from "./Control.module.css";
import { HTMLElementProps } from "../../../../../utils/interfaces/components";
import { ActionType } from "../../../../../utils/enums/components";

interface ControlItemProps extends HTMLElementProps {
  id: number;
}

const ControlItem: FC<ControlItemProps> = ({ id, classname }) => {
  return (
    <div className={classNames(classname, classes.control)}>
      <ControlButton id={id} name="Edit" type={ActionType.Edit} />
      <ControlButton id={id} name="Delete" type={ActionType.Delete} />
    </div>
  );
};

export default ControlItem;
