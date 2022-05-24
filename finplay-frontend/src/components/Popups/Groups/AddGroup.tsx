import { FormEvent, useContext } from "react";
import Select from "react-select";
import CustomInput from "../../Input/CustomInput";
import { getOptionsGames, selectionStyles } from "../SelectionInfo";
import classes from "../Popup.module.css";
import Context from "../../../context";
import SubmitButton from "../../Buttons/SubmitButton";
import { FormButtonType, InputType } from "../../../utils/enums/components";

const AddGroup = () => {
  const { store } = useContext(Context);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className={classes.popup__wrapper}>
      <div className={classes.popup__title}>Group add</div>
      <form className={classes.popup__form} onSubmit={handleSubmit}>
        <CustomInput
          inputType={{
            type: InputType.Text,
            name: "name",
            placeholder: "Group name",
          }}
          divClass={classes.popup__input}
        />
        <Select
          className={classes.popup__select}
          options={
            store.gameData ? getOptionsGames(store.gameData?.games) : undefined
          }
          styles={selectionStyles}
          placeholder={"Games"}
          isMulti
        />
        <SubmitButton
          name="Add"
          type={FormButtonType.Add}
          divClass={classes.popup__submit}
        />
      </form>
    </div>
  );
};

export default AddGroup;
