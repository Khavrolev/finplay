import { FC, FormEvent, useContext, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import ClassicInput from "../../Inputs/ClassicInput";
import classes from "../Popup.module.css";
import SubmitButton from "../../Buttons/SubmitButton";
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

  const [selectedGames, setSelectedGames] = useState(
    group?.games ? group?.games : [],
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className={classes.popup__wrapper}>
      <h1 className={classes.popup__title}>Group editing</h1>
      <form className={classes.popup__form} onSubmit={handleSubmit}>
        <ClassicInput
          inputType={{
            type: InputType.Text,
            name: "name",
            placeholder: "Group name",
          }}
          defaultValue={group?.name}
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
          name="Save"
          type={ActionType.Edit}
          divClass={classes.popup__submit}
        />
      </form>
    </div>
  );
};

export default observer(EditGroup);
