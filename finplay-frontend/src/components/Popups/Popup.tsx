import { observer } from "mobx-react-lite";
import { FC, MouseEvent, useContext } from "react";
import Context from "../../context";
import POPUP_CLOSED from "../../utils/constants/components";
import { ActionType } from "../../utils/enums/components";
import AddGroup from "./Groups/AddGroup";
import DeleteGroup from "./Groups/DeleteGroup";
import EditGroup from "./Groups/EditGroup";
import classes from "./Popup.module.css";

const Popup: FC = () => {
  const { store } = useContext(Context);

  const handleClosePopup = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) {
      return;
    }
    store.setPopup(POPUP_CLOSED);
  };

  const handleExit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    store.setPopup(POPUP_CLOSED);
  };

  return (
    <>
      {store.popup.modalOpened && (
        <div className={classes.popup} onClick={handleClosePopup}>
          <div className={classes.popup__content}>
            <button
              className={classes.popup__exit}
              onClick={handleExit}
            ></button>
            {store.popup.type === ActionType.Add && <AddGroup />}
            {store.popup.type === ActionType.Edit && (
              <EditGroup groupId={store.popup.id} />
            )}
            {store.popup.type === ActionType.Delete && (
              <DeleteGroup groupId={store.popup.id} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default observer(Popup);
