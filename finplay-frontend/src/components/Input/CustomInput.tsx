import classNames from "classnames";
import { FC, MouseEvent, useState } from "react";
import { InputType } from "../../utils/enums/components";
import { IDiv, IInput } from "../../utils/interfaces/components";
import classes from "./CustomInput.module.css";

interface CustomInputProps extends IDiv {
  inputType: IInput;
  error?: boolean;
}

const CustomInput: FC<CustomInputProps> = ({ inputType, error, divClass }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setShowPassword(!showPassword);
  };

  return (
    <div className={classNames(divClass, classes.input)}>
      <input
        className={classNames(classes.input__item, {
          [classes.input__item_error]: error,
        })}
        type={
          showPassword || inputType.type === InputType.Text
            ? InputType.Text
            : InputType.Password
        }
        placeholder={inputType.placeholder}
        name={inputType.name}
        required
      />
      <div className={classes.input__placeholder}>{inputType.placeholder}</div>
      {inputType.type === InputType.Password && (
        <button
          className={classes.input__eye}
          onClick={handleShowPassword}
        ></button>
      )}
    </div>
  );
};

export default CustomInput;
