import { ActionType, InputType } from "../enums/components";

export interface IDiv {
  divClass?: string;
}

export interface IInput {
  type: InputType;
  name: string;
  placeholder: string;
}

export interface IPopup {
  type: ActionType | undefined;
  modalOpened: boolean;
  id: number;
}

export interface IOption {
  value: number;
  label: string;
}
