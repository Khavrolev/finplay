import { StylesConfig } from "react-select";
import { IOption } from "../../utils/interfaces/components";
import { IGame, IGroup } from "../../utils/interfaces/gameData";

export const multiSelectionStyles: StylesConfig<IOption, true> = {
  control: (provided, state) => ({
    ...provided,
    padding: state.hasValue ? "30px 6px 12px 6px" : "12px 6px",
    minHeight: "100px",
    border: "1px solid #f2f2f2",
  }),
  multiValue: (provided) => ({
    ...provided,
    padding: "6px",
    backgroundColor: "#FDBC11",
    borderRadius: "4px",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    fontSize: "16px",
  }),
};

export const singleSelectionStyles: StylesConfig<IOption, false> = {
  control: (provided, state) => ({
    ...provided,
    padding: state.hasValue ? "23px 6px 12px 6px" : "12px 6px",
    minHeight: "73px",
    border: "1px solid #f2f2f2",
  }),
};

export const getOptions = (
  items: IGame[] | IGroup[] | undefined,
): IOption[] => {
  if (!items) {
    return [];
  }

  return items.map((item) => {
    return { value: item.id, label: item.name };
  });
};
