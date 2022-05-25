import { FC, useCallback, useContext, useMemo, useState } from "react";
import classes from "../Popup.module.css";
import Button from "../../Buttons/Button";
import { ActionType } from "../../../utils/enums/components";
import Context from "../../../context";
import CheckBoxInput from "../../Inputs/CheckBoxInput";
import SingleSelection from "../../Selects/SingleSelection";
import { getOptions } from "../../Selects/SelectionInfo";

interface DeleteGroupProps {
  groupId: number;
}

const DeleteGroup: FC<DeleteGroupProps> = ({ groupId }) => {
  const { store } = useContext(Context);

  const [selectedGroup, setSelectedGroup] = useState<number | undefined>();
  const [completelyDelete, setCompletelyDelete] = useState(false);

  const group = useMemo(
    () => store.gameData?.groups.find((item) => item.id === groupId),
    [groupId, store.gameData?.groups],
  );

  const handleSubmit = useCallback(async () => {}, []);

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
      <div className={classes.popup__form}>
        <SingleSelection
          selectedItem={selectedGroup}
          handleSelectedItem={setSelectedGroup}
          options={getOptions(store.gameData?.groups)}
          placeholder={"Move games to"}
        />
        <CheckBoxInput
          placeholder="Delete completely"
          value={completelyDelete}
          handleChangeValue={setCompletelyDelete}
          divClass={classes.popup__checkbox}
        />
        <Button
          name="Yes, delete"
          type={ActionType.Delete}
          handleClick={handleSubmit}
          divClass={classes.popup__submit}
        />
      </div>
    </div>
  );
};

export default DeleteGroup;
