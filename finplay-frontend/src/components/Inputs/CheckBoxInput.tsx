import classNames from "classnames";
import { FC } from "react";
import { IDiv } from "../../utils/interfaces/components";
import classes from "./CheckBoxInput.module.css";

interface CheckBoxInputProps extends IDiv {
  value: boolean;
  handleChangeValue: (value: boolean) => void;
  placeholder: string;
}

const CheckBoxInput: FC<CheckBoxInputProps> = ({
  value,
  handleChangeValue,
  placeholder,
  divClass,
}) => {
  return (
    <div className={classNames(divClass, classes.input)}>
      <input
        className={classes.input__item}
        type="checkbox"
        name="checkbox"
        checked={value}
        onClick={() => handleChangeValue(!value)}
      />
      <label className={classes.input__label} htmlFor="checkbox">
        {placeholder}
      </label>
    </div>
  );
};

export default CheckBoxInput;
