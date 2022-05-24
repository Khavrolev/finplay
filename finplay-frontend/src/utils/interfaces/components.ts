import { ActionPopupType, InputType } from "../enums/components";

export interface IDiv {
  divClass?: string;
}

export interface IInput {
  type: InputType;
  name: string;
  placeholder: string;
}

export interface IPopup {
  type: ActionPopupType | undefined;
  modalOpened: boolean;
}
