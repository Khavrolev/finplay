import classNames from "classnames";
import { observer } from "mobx-react-lite";
import { FC, useContext } from "react";
import Context from "../../context";
import { ActionType } from "../../utils/enums/components";
import { IDiv } from "../../utils/interfaces/components";
import classes from "./Button.module.css";

interface ButtonProps extends IDiv {
  name: string;
  type: ActionType;
  handleClick: () => void;
}

const Button: FC<ButtonProps> = ({ name, type, handleClick, divClass }) => {
  const { store } = useContext(Context);

  return (
    <button
      className={classNames(
        divClass,
        classes.button,
        classes[`button_${type}`],
      )}
      onClick={(event) => {
        event.preventDefault();
        handleClick();
      }}
    >
      <div className={classes.button__text}>
        {store.loading ? <div className={classes.button__loader}></div> : name}
      </div>
    </button>
  );
};

export default observer(Button);
