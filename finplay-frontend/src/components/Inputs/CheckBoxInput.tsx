import classNames from "classnames";
import { FC } from "react";
import { IDiv, IInput } from "../../utils/interfaces/components";
import classes from "./CheckBoxInput.module.css";

interface CheckBoxInputProps extends IDiv {
  inputType: IInput;
}

const CheckBoxInput: FC<CheckBoxInputProps> = ({ inputType, divClass }) => {
  return (
    <div className={classNames(divClass, classes.input)}>
      <input
        className={classes.input__item}
        type={inputType.type}
        name={inputType.name}
        required
      />
      <label className={classes.input__label} htmlFor={inputType.name}>
        {inputType.placeholder}
      </label>
    </div>
  );
};

export default CheckBoxInput;
