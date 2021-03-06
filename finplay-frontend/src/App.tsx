import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import classes from "./App.module.css";
import LoginForm from "./components/Login/LoginForm";
import MainPage from "./components/Pages/MainPage/MainPage";
import Popup from "./components/Popups/Popup";
import Context from "./context";

const App = () => {
  const { store } = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      if (
        localStorage.getItem(
          `${process.env.REACT_APP_LOCAL_STORAGE_TOKEN_NAME}`,
        )
      ) {
        await store.checkAuth();
      }

      store.setInitialized(true);
    };

    fetchData();
  }, [store]);

  return (
    <div className={classes.wrapper}>
      <Popup />
      {!store.user && store.initialized && (
        <LoginForm classname={classes.wrapper__loginform} />
      )}
      {store.user && <MainPage classname={classes.wrapper__mainpage} />}
    </div>
  );
};

export default observer(App);
