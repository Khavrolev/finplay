import { useCallback, useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import classNames from "classnames";
import ClassicInput from "../../Inputs/ClassicInput";
import classes from "../Popup.module.css";
import LoaderButton from "../../Buttons/LoaderButton";
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

    const addedGroup = await store.createGroup({ name, games: selectedGames });

    if (!addedGroup) {
      setError(true);
      return;
    }

    store.setPopup(POPUP_CLOSED);
  }, [name, selectedGames, store]);

  return (
    <div className={classes.popup__wrapper}>
      <h1
        className={classNames(classes.popup__title, {
          [classes.popup__title_error]: error,
        })}
      >
        Group add
      </h1>
      <div className={classes.popup__form}>
        <ClassicInput
          type={InputType.Text}
          value={name}
          handleChangeValue={setName}
          placeholder={"Group name"}
          error={error}
          classname={classes.popup__input}
        />
        <MultiSelection
          selectedItems={selectedGames}
          handleSelectedItems={setSelectedGames}
          options={getOptions(store.games)}
          placeholder={"Games"}
          classname={classes.popup__select}
        />
        <LoaderButton
          name="Add"
          type={ActionType.Add}
          handleClick={handleSubmit}
          disabled={name === ""}
          classname={classes.popup__submit}
        />
      </div>
    </div>
  );
};

export default observer(AddGroup);
