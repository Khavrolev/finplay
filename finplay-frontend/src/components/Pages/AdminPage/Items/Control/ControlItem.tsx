import classNames from "classnames";
import { FC } from "react";
import { IDiv } from "../../../../../utils/interfaces";
import ControlButton from "./ControlButton";
import classes from "./Control.module.css";

const ControlItem: FC<IDiv> = ({ divClass }) => {
  return (
    <div className={classNames(divClass[0], classes.control)}>
      <ControlButton
        name="Edit"
        divClass={[classes.control__icon_edit, classes.control__text_edit]}
      />
      <ControlButton
        name="Delete"
        divClass={[classes.control__icon_delete, classes.control__text_delete]}
      />
    </div>
  );
};

export default ControlItem;
