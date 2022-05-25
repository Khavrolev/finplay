import { FormEvent, useContext, useState } from "react";
import ClassicInput from "../../Inputs/ClassicInput";
import classes from "../Popup.module.css";
import SubmitButton from "../../Buttons/SubmitButton";
import { ActionType, InputType } from "../../../utils/enums/components";
import MultiSelection from "../../Selects/MultiSelection";
import Context from "../../../context";
import { getOptions } from "../../Selects/SelectionInfo";

const AddGroup = () => {
  const { store } = useContext(Context);

  const [selectedGames, setSelectedGames] = useState([] as number[]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className={classes.popup__wrapper}>
      <h1 className={classes.popup__title}>Group add</h1>
      <form className={classes.popup__form} onSubmit={handleSubmit}>
        <ClassicInput
          inputType={{
            type: InputType.Text,
            name: "name",
            placeholder: "Group name",
          }}
          divClass={classes.popup__input}
        />
        <MultiSelection
          selectedItems={selectedGames}
          handleSelectedItems={setSelectedGames}
          options={getOptions(store.gameData?.games)}
          placeholder={"Games"}
          divClass={classes.popup__select}
        />
        <SubmitButton
          name="Add"
          type={ActionType.Add}
          divClass={classes.popup__submit}
        />
      </form>
    </div>
  );
};

export default AddGroup;
