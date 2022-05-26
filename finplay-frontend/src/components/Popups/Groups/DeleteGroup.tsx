import { FC, useCallback, useContext, useMemo, useState } from "react";
import classes from "../Popup.module.css";
import Button from "../../Buttons/Button";
import { ActionType } from "../../../utils/enums/components";
import Context from "../../../context";
import CheckBoxInput from "../../Inputs/CheckBoxInput";
import SingleSelection from "../../Selects/SingleSelection";
import { getOptions } from "../../Selects/SelectionInfo";
import POPUP_CLOSED from "../../../utils/constants/components";

interface DeleteGroupProps {
  groupId: number;
}

const DeleteGroup: FC<DeleteGroupProps> = ({ groupId }) => {
  const { store } = useContext(Context);

  const [selectedGroup, setSelectedGroup] = useState(-1);
  const [completelyDelete, setCompletelyDelete] = useState(false);

  const group = useMemo(
    () => store.gameData?.groups.find((item) => item.id === groupId),
    [groupId, store.gameData?.groups],
  );

  const handleSubmit = useCallback(async () => {}, []);

  const handleCancel = () => store.setPopup(POPUP_CLOSED);

  return (
    <div className={classes.popup__wrapper}>
      <h1 className={classes.popup__title}>Group delete</h1>
      <div
        className={classes.popup__text}
      >{`Do you want to delete ${group?.name} group?\nAll ${group?.games.length} games will be moved to selected group.`}</div>
      <div className={classes.popup__form}>
        <SingleSelection
          selectedItem={selectedGroup}
          handleSelectedItem={setSelectedGroup}
          options={getOptions(store.gameData?.groups)}
          disabled={completelyDelete}
          placeholder={"Move games to"}
        />
        <CheckBoxInput
          value={completelyDelete}
          handleChangeValue={setCompletelyDelete}
          disabled={selectedGroup !== -1}
          placeholder="Delete completely"
          divClass={classes.popup__checkbox}
        />
        <div className={classes.popup__submit}>
          <Button
            name="Yes, delete"
            type={ActionType.Delete}
            handleClick={handleSubmit}
            disabled={selectedGroup === -1 && !completelyDelete}
            divClass={classes.popup__button}
          />
          <Button
            name="No"
            type={ActionType.Cancel}
            handleClick={handleCancel}
            disabled={false}
            divClass={classes.popup__button}
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteGroup;
