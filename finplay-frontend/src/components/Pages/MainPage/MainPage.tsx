import classNames from "classnames";
import { observer } from "mobx-react-lite";
import { FC, useContext, useEffect } from "react";
import Context from "../../../context";
import { HTMLElementProps } from "../../../utils/interfaces/components";
import AdminPage from "../AdminPage/AdminPage";
import Header from "../Header/Header";
import UserPage from "../UserPage/UserPage";
import classes from "./MainPage.module.css";

const MainPage: FC<HTMLElementProps> = ({ classname }) => {
  const { store } = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      await store.getGameData();
    };

    fetchData();
  }, [store]);

  return (
    <div className={classNames(classname, classes.mainpage)}>
      <Header classname={classes.mainpage__header} />
      {store.user?.adminRole && (
        <AdminPage classname={classes.mainpage__adminpage} />
      )}
      {store.user && !store.user.adminRole && (
        <UserPage classname={classes.mainpage__userpage} />
      )}
    </div>
  );
};

export default observer(MainPage);
