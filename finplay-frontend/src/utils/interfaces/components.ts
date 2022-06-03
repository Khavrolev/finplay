import { ActionType } from "../enums/components";

export interface HTMLElementProps {
  classname?: string;
}

export interface LoaderButtonProps extends HTMLElementProps {
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
