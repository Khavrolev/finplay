import classNames from "classnames";
import { FC } from "react";
import Select from "react-select/";
import {
  HTMLElementProps,
  OptionProps,
} from "../../utils/interfaces/components";
import { multiSelectionStyles } from "./SelectionInfo";
import classes from "./Select.module.css";

interface MultiSelectionProps extends HTMLElementProps {
  selectedItems: number[];
  handleSelectedItems: (games: number[]) => void;
  options: OptionProps[];
  placeholder: string;
}

const MultiSelection: FC<MultiSelectionProps> = ({
  selectedItems,
  handleSelectedItems,
  options,
  placeholder,
  classname,
}) => {
  return (
    <div className={classNames(classname, classes.select)}>
      <Select
        styles={multiSelectionStyles}
        options={options}
        value={options?.filter((item) => selectedItems.includes(item.value))}
        placeholder={placeholder}
        onChange={(event) =>
          handleSelectedItems(event.map((item) => item.value))
        }
        isSearchable
        isMulti
      />
      <div
        style={{ opacity: selectedItems.length > 0 ? "0.5" : "0" }}
        className={classes.select__placeholder}
      >
        {placeholder}
      </div>
    </div>
  );
};

export default MultiSelection;
