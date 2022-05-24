import classNames from "classnames";
import { FC } from "react";
import ControlButton from "./ControlButton";
import classes from "./Control.module.css";
import { IDiv } from "../../../../../utils/interfaces/components";
import { ActionPopupType } from "../../../../../utils/enums/components";

const ControlItem: FC<IDiv> = ({ divClass }) => {
  return (
    <div className={classNames(divClass, classes.control)}>
      <ControlButton name="Edit" type={ActionPopupType.Edit} />
      <ControlButton name="Delete" type={ActionPopupType.Delete} />
    </div>
  );
};

export default ControlItem;
