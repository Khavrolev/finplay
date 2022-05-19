import { observer } from "mobx-react-lite";
import { FormEvent, useState, useContext, FC } from "react";
import classNames from "classnames";
import classes from "./LoginForm.module.css";
import Context from "../../context";
import { IDiv } from "../../utils/interfaces";
import Logo from "../Logo/Logo";

const LoginForm: FC<IDiv> = ({ divClass }) => {
  const { store } = useContext(Context);
  const [showPassword, setShowPassword] = useState(false);
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
        <div className={classes.loginform__wrapinput}>
          <input
            className={classNames(classes.loginform__input, {
              [classes.loginform__input_error]: error,
            })}
            type="text"
            placeholder="Login"
            name="login"
            required
          />
          <div className={classes.loginform__placeholder}>Login</div>
        </div>
        <div className={classes.loginform__wrapinput}>
          <input
            className={classNames(classes.loginform__input, {
              [classes.loginform__input_error]: error,
            })}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            required
          />
          <div className={classes.loginform__placeholder}>Password</div>
          <button
            className={classes.loginform__eye}
            onClick={() => setShowPassword(!showPassword)}
          ></button>
        </div>
        <button className={classes.loginform__submit} type="submit">
          <div className={classes.loginform__buttontext}>
            {store.loading ? (
              <div className={classes.loginform__loader}></div>
            ) : (
              "Login"
            )}
          </div>
        </button>
      </form>
    </div>
  );
};

export default observer(LoginForm);
