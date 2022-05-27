import { useCallback, useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import ClassicInput from "../../Inputs/ClassicInput";
import classes from "../Popup.module.css";
import Button from "../../Buttons/Button";
import { ActionType, InputType } from "../../../utils/enums/components";
import MultiSelection from "../../Selects/MultiSelection";
import Context from "../../../context";
import { getOptions } from "../../Selects/SelectionInfo";
import POPUP_CLOSED from "../../../utils/constants/components";

const AddGroup = () => {
  const { store } = useContext(Context);

  const [name, setName] = useState("");
  const [selectedGames, setSelectedGames] = useState([] as number[]);
  const [error, setError] = useState(false);

  const handleSubmit = useCallback(async () => {
    if (store.groups.find((item) => item.name === name)) {
      setError(true);
      return;
    }
    store.createGroup({ name, games: selectedGames });

    store.setPopup(POPUP_CLOSED);
  }, [name, selectedGames, store]);

  return (
    <div className={classes.popup__wrapper}>
      <h1 className={classes.popup__title}>Group add</h1>
      <div className={classes.popup__form}>
        <ClassicInput
          type={InputType.Text}
          value={name}
          handleChangeValue={setName}
          placeholder={"Group name"}
          error={error}
          divClass={classes.popup__input}
        />
        <MultiSelection
          selectedItems={selectedGames}
          handleSelectedItems={setSelectedGames}
          options={getOptions(store.games)}
          placeholder={"Games"}
          divClass={classes.popup__select}
        />
        <Button
          name="Add"
          type={ActionType.Add}
          handleClick={handleSubmit}
          disabled={name === ""}
          divClass={classes.popup__submit}
        />
      </div>
    </div>
  );
};

export default observer(AddGroup);
