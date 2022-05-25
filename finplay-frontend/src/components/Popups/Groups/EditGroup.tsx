import { FC, useCallback, useContext, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import ClassicInput from "../../Inputs/ClassicInput";
import classes from "../Popup.module.css";
import Button from "../../Buttons/Button";
import { ActionType, InputType } from "../../../utils/enums/components";
import MultiSelection from "../../Selects/MultiSelection";
import Context from "../../../context";
import { getOptions } from "../../Selects/SelectionInfo";

interface EditGroupProps {
  groupId: number;
}

const EditGroup: FC<EditGroupProps> = ({ groupId }) => {
  const { store } = useContext(Context);

  const group = useMemo(
    () => store.gameData?.groups.find((item) => item.id === groupId),
    [groupId, store.gameData?.groups],
  );

  const [name, setName] = useState(group?.name ? group?.name : "");
  const [selectedGames, setSelectedGames] = useState(
    group?.games ? group?.games : [],
  );

  const handleSubmit = useCallback(async () => {}, []);

  return (
    <div className={classes.popup__wrapper}>
      <h1 className={classes.popup__title}>Group editing</h1>
      <div className={classes.popup__form}>
        <ClassicInput
          type={InputType.Text}
          value={name}
          handleChangeValue={setName}
          placeholder={"Group name"}
          divClass={classes.popup__input}
        />
        <MultiSelection
          selectedItems={selectedGames}
          handleSelectedItems={setSelectedGames}
          options={getOptions(store.gameData?.games)}
          placeholder={"Games"}
          divClass={classes.popup__select}
        />
        <Button
          name="Save"
          type={ActionType.Edit}
          handleClick={handleSubmit}
          divClass={classes.popup__submit}
        />
      </div>
    </div>
  );
};

export default observer(EditGroup);
