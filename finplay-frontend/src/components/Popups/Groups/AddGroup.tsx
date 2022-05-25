import { useCallback, useContext, useState } from "react";
import ClassicInput from "../../Inputs/ClassicInput";
import classes from "../Popup.module.css";
import Button from "../../Buttons/Button";
import { ActionType, InputType } from "../../../utils/enums/components";
import MultiSelection from "../../Selects/MultiSelection";
import Context from "../../../context";
import { getOptions } from "../../Selects/SelectionInfo";

const AddGroup = () => {
  const { store } = useContext(Context);

  const [name, setName] = useState("");
  const [selectedGames, setSelectedGames] = useState([] as number[]);

  const handleSubmit = useCallback(async () => {}, []);

  return (
    <div className={classes.popup__wrapper}>
      <h1 className={classes.popup__title}>Group add</h1>
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
          name="Add"
          type={ActionType.Add}
          handleClick={handleSubmit}
          divClass={classes.popup__submit}
        />
      </div>
    </div>
  );
};

export default AddGroup;
