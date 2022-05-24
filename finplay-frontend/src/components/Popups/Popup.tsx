import { observer } from "mobx-react-lite";
import { FC, MouseEvent, useContext } from "react";
import ReactModal from "react-modal";
import Context from "../../context";
import POPUP_CLOSED from "../../utils/constants/components";
import { ActionPopupType } from "../../utils/enums/components";
import AddGroup from "./Groups/AddGroup";
import classes from "./Popup.module.css";

const Popup: FC = () => {
  const { store } = useContext(Context);

  const handleExit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    store.setPopup(POPUP_CLOSED);
  };

  return (
    <ReactModal
      isOpen={store.popup.modalOpened}
      onRequestClose={() => store.setPopup(POPUP_CLOSED)}
      className={classes.popup}
      overlayClassName={classes.popup__overlay}
    >
      <button className={classes.popup__exit} onClick={handleExit}></button>
      {store.popup.type === ActionPopupType.Add && <AddGroup />}
    </ReactModal>
  );
};

export default observer(Popup);
