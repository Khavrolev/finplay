import classNames from "classnames";
import { observer } from "mobx-react-lite";
import { FC, useContext, useEffect } from "react";
import Context from "../../../context";
import { IDiv } from "../../../utils/interfaces";
import AdminPage from "../AdminPage/AdminPage";
import Header from "../Header/Header";
import UserPage from "../UserPage/UserPage";
import classes from "./MainPage.module.css";

const MainPage: FC<IDiv> = ({ divClass }) => {
  const { store } = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      await store.getGameData();
    };

    fetchData();
  }, [store]);

  return (
    <div className={classNames(divClass, classes.mainpage)}>
      <Header divClass={classes.mainpage__header} />
      {store.user?.adminRole && <AdminPage />}
      {store.user && !store.user.adminRole && (
        <UserPage divClass={classes.mainpage__userpage} />
      )}
    </div>
  );
};

export default observer(MainPage);
