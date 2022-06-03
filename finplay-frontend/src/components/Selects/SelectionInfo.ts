import { StylesConfig } from "react-select";
import { OptionProps } from "../../utils/interfaces/components";
import { GameProps, GroupProps } from "../../utils/interfaces/gameData";

export const multiSelectionStyles: StylesConfig<OptionProps, true> = {
  valueContainer: (provided) => ({
    ...provided,
    maxHeight: "500px",
    overflow: "auto",
  }),
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

export const singleSelectionStyles: StylesConfig<OptionProps, false> = {
  control: (provided, state) => ({
    ...provided,
    padding: state.hasValue ? "23px 6px 12px 6px" : "12px 6px",
    minHeight: "73px",
    border: "1px solid #f2f2f2",
  }),
};

export const getOptions = (
  items: GameProps[] | GroupProps[],
): OptionProps[] => {
  if (!items) {
    return [];
  }

  return items.map((item) => {
    return { value: item.id, label: item.name };
  });
};
