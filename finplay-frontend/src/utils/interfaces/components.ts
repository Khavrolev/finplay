import { ActionType } from "../enums/components";

export interface IDiv {
  divClass?: string;
}

export interface LoaderButtonProps extends IDiv {
  name: string;
  type: ActionType;
  handleClick: () => void;
  disabled: boolean;
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
