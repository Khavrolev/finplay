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

export interface PopupProps {
  type: ActionType | undefined;
  modalOpened: boolean;
  id: number;
}

export interface OptionProps {
  value: number;
  label: string;
}
