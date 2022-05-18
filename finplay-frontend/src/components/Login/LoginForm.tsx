import { observer } from "mobx-react-lite";
import { FormEvent, useState, useContext } from "react";
import classes from "./LoginForm.module.css";
import Context from "../../context";

const LoginForm = () => {
  const { store } = useContext(Context);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (store.isLoading) {
      return;
    }

    const login = event.currentTarget.login.value;
    const password = event.currentTarget.password.value;

    store.login(login, password);
  };

  return (
    <div className={classes.loginform}>
      <div className={classes.loginform__logo}></div>
      <form className={classes.loginform__form} onSubmit={handleSubmit}>
        <div className={classes.loginform__wrapinput}>
          <input
            className={classes.loginform__input}
            type="text"
            placeholder="Login"
            name="login"
            required
          />
          <div className={classes.loginform__placeholder}>Login</div>
        </div>
        <div className={classes.loginform__wrapinput}>
          <input
            className={classes.loginform__input}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            required
          />
          <div className={classes.loginform__placeholder}>Password</div>
          <div
            className={classes.loginform__eye}
            onClick={() => setShowPassword(!showPassword)}
          ></div>
        </div>
        <button className={classes.loginform__submit} type="submit">
          <div className={classes.loginform__buttontext}>
            {store.isLoading ? (
              <img
                className={classes.loginform__loader}
                src="./img/loader.png"
                alt="loading"
              ></img>
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
