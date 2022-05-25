import { observer } from "mobx-react-lite";
import { FormEvent, useState, useContext, FC } from "react";
import classNames from "classnames";
import classes from "./LoginForm.module.css";
import Context from "../../context";
import Logo from "../Logo/Logo";
import ClassicInput from "../Inputs/ClassicInput";
import SubmitButton from "../Buttons/SubmitButton";
import { IDiv } from "../../utils/interfaces/components";
import { ActionType, InputType } from "../../utils/enums/components";

const LoginForm: FC<IDiv> = ({ divClass }) => {
  const { store } = useContext(Context);
  const [error, setError] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (store.loading) {
      return;
    }

    const login = event.currentTarget.login.value;
    const password = event.currentTarget.password.value;

    await store.login(login, password);

    if (!store.user) {
      setError(true);
    }
  };

  return (
    <div className={classNames(divClass, classes.loginform)}>
      <Logo divClass={classes.loginform__logo} />
      <form className={classes.loginform__form} onSubmit={handleSubmit}>
        <ClassicInput
          inputType={{
            type: InputType.Text,
            name: "login",
            placeholder: "Login",
          }}
          error={error}
          divClass={classes.loginform__input}
        />
        <ClassicInput
          inputType={{
            type: InputType.Password,
            name: "password",
            placeholder: "Password",
          }}
          error={error}
          divClass={classes.loginform__input}
        />
        <SubmitButton
          name="Login"
          type={ActionType.Login}
          divClass={classes.loginform__submit}
        />
      </form>
    </div>
  );
};

export default observer(LoginForm);
