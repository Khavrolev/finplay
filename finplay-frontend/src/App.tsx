import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import classes from "./App.module.css";
import LoginForm from "./components/Login/LoginForm";
import Context from "./context";
import { LOCAL_STORAGE_TOKEN_NAME } from "./utils/constants";

const App = () => {
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)) {
      store.checkAuth();
    }
  }, [store]);

  return (
    <div className={classes.wrapper}>
      {!store.user && (
        <div className={classes.wrapper__loginform}>
          <LoginForm />
        </div>
      )}
      {store.user && <button onClick={() => store.logout()}>Logout</button>}
    </div>
  );
};

export default observer(App);
