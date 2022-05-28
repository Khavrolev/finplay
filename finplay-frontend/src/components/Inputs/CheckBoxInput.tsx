import classNames from "classnames";
import { FC } from "react";
import { IDiv } from "../../utils/interfaces/components";
import classes from "./CheckBoxInput.module.css";

interface CheckBoxInputProps extends IDiv {
  value: boolean;
  handleChangeValue: (value: boolean) => void;
  disabled: boolean;
  placeholder: string;
}

const CheckBoxInput: FC<CheckBoxInputProps> = ({
  value,
  handleChangeValue,
  disabled,
  placeholder,
  divClass,
}) => {
  return (
    <div className={classNames(divClass, classes.input)}>
      <input
        className={classes.input__item}
        type="checkbox"
        id="checkbox"
        value={value ? 1 : 0}
        onClick={() => handleChangeValue(!value)}
        disabled={disabled}
      />
      <label
        className={classNames(classes.input__label, {
          [classes.input__label_disabled]: disabled,
        })}
        htmlFor="checkbox"
      >
        {placeholder}
      </label>
    </div>
  );
};

export default CheckBoxInput;
