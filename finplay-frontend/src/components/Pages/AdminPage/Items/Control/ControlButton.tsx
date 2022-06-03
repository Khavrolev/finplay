import classNames from "classnames";
import { observer } from "mobx-react-lite";
import { FC, useContext } from "react";
import Context from "../../../../../context";
import { ActionType } from "../../../../../utils/enums/components";
import { HTMLElementProps } from "../../../../../utils/interfaces/components";
import classes from "./Control.module.css";

interface ControlButtonProps extends HTMLElementProps {
  id: number;
  name: string;
  type: ActionType;
}

const ControlButton: FC<ControlButtonProps> = ({ id, name, type }) => {
  const { store } = useContext(Context);

  const handleClick = () => {
    store.setPopup({ type, modalOpened: true, id });
  };

  return (
    <button className={classes.control__action} onClick={handleClick}>
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

export default observer(ControlButton);
