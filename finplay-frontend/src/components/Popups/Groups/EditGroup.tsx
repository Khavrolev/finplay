import { FC, useCallback, useContext, useMemo, useState } from "react";
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

interface EditGroupProps {
  groupId: number;
}

const EditGroup: FC<EditGroupProps> = ({ groupId }) => {
  const { store } = useContext(Context);

  const group = useMemo(
    () => store.groups.find((item) => item.id === groupId),
    [groupId, store.groups],
  );

  const [name, setName] = useState(group?.name ? group?.name : "");
  const [selectedGames, setSelectedGames] = useState(
    group?.games ? group?.games : [],
  );
  const [error, setError] = useState(false);

  const handleSubmit = useCallback(async () => {
    if (
      store.groups.find((item) => item.name === name && item.id !== groupId)
    ) {
      setError(true);
      return;
    }

    const editedGroup = await store.updateGroup({
      id: groupId,
      name,
      games: selectedGames,
    });

    if (!editedGroup) {
      setError(true);
      return;
    }

    store.setPopup(POPUP_CLOSED);
  }, [groupId, name, selectedGames, store]);

  return (
    <div className={classes.popup__wrapper}>
      <h1
        className={classNames(classes.popup__title, {
          [classes.popup__title_error]: error,
        })}
      >
        Group editing
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
          name="Save"
          type={ActionType.Edit}
          handleClick={handleSubmit}
          disabled={name === ""}
          classname={classes.popup__submit}
        />
      </div>
    </div>
  );
};

export default observer(EditGroup);
