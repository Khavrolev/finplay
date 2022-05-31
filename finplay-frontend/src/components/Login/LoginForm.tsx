import { observer } from "mobx-react-lite";
import { useState, useContext, FC, useCallback } from "react";
import classNames from "classnames";
import classes from "./LoginForm.module.css";
import Context from "../../context";
import Logo from "../Logo/Logo";
import ClassicInput from "../Inputs/ClassicInput";
import LoaderButton from "../Buttons/LoaderButton";
import { IDiv } from "../../utils/interfaces/components";
import { ActionType, InputType } from "../../utils/enums/components";

const LoginForm: FC<IDiv> = ({ divClass }) => {
  const { store } = useContext(Context);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = useCallback(async () => {
    if (store.loading) {
      return;
    }

    await store.login(login, password);

    if (!store.user) {
      setError(true);
    }
  }, [login, password, store]);

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div
      className={classNames(divClass, classes.loginform)}
      onKeyPress={handleKeyPress}
    >
      <Logo divClass={classes.loginform__logo} />
      <div className={classes.loginform__form}>
        <ClassicInput
          type={InputType.Text}
          value={login}
          handleChangeValue={setLogin}
          placeholder={"Login"}
          error={error}
          divClass={classes.loginform__input}
        />
        <ClassicInput
          type={InputType.Password}
          value={password}
          handleChangeValue={setPassword}
          placeholder={"Password"}
          error={error}
          divClass={classes.loginform__input}
        />
        <LoaderButton
          name="Login"
          type={ActionType.Login}
          handleClick={handleSubmit}
          disabled={false}
          divClass={classes.loginform__submit}
        />
      </div>
    </div>
  );
};

export default observer(LoginForm);
