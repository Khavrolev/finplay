import classNames from "classnames";
import { FC } from "react";
import { LoaderButtonProps } from "../../utils/interfaces/components";
import classes from "./Button.module.css";

interface ButtonProps extends LoaderButtonProps {
  loading: boolean;
}

const Button: FC<ButtonProps> = ({
  name,
  type,
  handleClick,
  disabled,
  divClass,
  loading,
}) => {
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
      disabled={disabled}
    >
      <div className={classes.button__text}>
        {loading ? <div className={classes.button__loader}></div> : name}
      </div>
    </button>
  );
};

export default Button;
