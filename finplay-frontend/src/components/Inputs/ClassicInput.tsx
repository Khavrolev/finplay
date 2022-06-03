import classNames from "classnames";
import { FC, MouseEvent, useState } from "react";
import { InputType } from "../../utils/enums/components";
import { HTMLElementProps } from "../../utils/interfaces/components";
import classes from "./ClassicInput.module.css";

interface CustomInputProps extends HTMLElementProps {
  type: InputType;
  value: string;
  handleChangeValue: (value: string) => void;
  placeholder: string;
  error?: boolean;
}

const CustomInput: FC<CustomInputProps> = ({
  type,
  value,
  handleChangeValue,
  placeholder,
  error,
  classname,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setShowPassword(!showPassword);
  };

  return (
    <div className={classNames(classname, classes.input)}>
      <input
        className={classNames(classes.input__item, {
          [classes.input__item_error]: error,
        })}
        type={
          showPassword || type === InputType.Text
            ? InputType.Text
            : InputType.Password
        }
        placeholder={placeholder}
        value={value}
        onChange={(event) => handleChangeValue(event.target.value)}
        required
      />
      <div className={classes.input__placeholder}>{placeholder}</div>
      {type === InputType.Password && (
        <button
          className={classes.input__eye}
          onClick={handleShowPassword}
        ></button>
      )}
    </div>
  );
};

export default CustomInput;
