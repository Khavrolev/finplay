import { IGroup } from "./interfaces/gameData";

const changeGroupInArray = (currentGroups: IGroup[], updatedGroup: IGroup) =>
  currentGroups.map((item) =>
    item.id === updatedGroup.id ? updatedGroup : item,
  );

export default changeGroupInArray;
