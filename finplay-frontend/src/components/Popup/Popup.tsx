import { observer } from "mobx-react-lite";
import { useContext } from "react";
import ReactModal from "react-modal";
import Context from "../../context";

const Popup = () => {
  const { store } = useContext(Context);

  return (
    <ReactModal
      isOpen={store.modalOpened}
      onRequestClose={() => store.setModalOpened(false)}
    >
      <div>Hello world</div>
    </ReactModal>
  );
};

export default observer(Popup);
