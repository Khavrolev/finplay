import { FC, FormEvent, useContext, useMemo, useState } from "react";
import classes from "../Popup.module.css";
import SubmitButton from "../../Buttons/SubmitButton";
import { ActionType, InputType } from "../../../utils/enums/components";
import Context from "../../../context";
import CheckBoxInput from "../../Inputs/CheckBoxInput";
import SingleSelection from "../../Selects/SingleSelection";
import { getOptions } from "../../Selects/SelectionInfo";

interface DeleteGroupProps {
  groupId: number;
}

const DeleteGroup: FC<DeleteGroupProps> = ({ groupId }) => {
  const { store } = useContext(Context);

  const [selectedGroup, setSelectedGroup] = useState(-1);

  const group = useMemo(
    () => store.gameData?.groups.find((item) => item.id === groupId),
    [groupId, store.gameData?.groups],
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className={classes.popup__wrapper}>
      <h1 className={classes.popup__title}>Group delete</h1>
      <div className={classes.popup__textblock}>
        <div
          className={classes.popup__text}
        >{`Do you want to delete ${group?.name} group?`}</div>
        <div
          className={classes.popup__text}
        >{`All ${group?.games.length} games will be moved to selected group.`}</div>
      </div>
      <form className={classes.popup__form} onSubmit={handleSubmit}>
        <SingleSelection
          selectedItem={selectedGroup}
          handleSelectedItem={setSelectedGroup}
          options={getOptions(store.gameData?.groups)}
          placeholder={"Move games to"}
        />
        <CheckBoxInput
          inputType={{
            type: InputType.Checkbox,
            name: "delete",
            placeholder: "Delete completely",
          }}
          divClass={classes.popup__checkbox}
        />
        <SubmitButton
          name="Yes, delete"
          type={ActionType.Delete}
          divClass={classes.popup__submit}
        />
      </form>
    </div>
  );
};

export default DeleteGroup;
