import classNames from "classnames";
import { FC } from "react";
import Select from "react-select/";
import { IDiv, IOption } from "../../utils/interfaces/components";
import { multiSelectionStyles } from "./SelectionInfo";
import classes from "./Select.module.css";

interface MultiSelectionProps extends IDiv {
  selectedItems: number[];
  handleSelectedItems: (games: number[]) => void;
  options: IOption[];
  placeholder: string;
}

const MultiSelection: FC<MultiSelectionProps> = ({
  selectedItems,
  handleSelectedItems,
  options,
  placeholder,
  divClass,
}) => {
  return (
    <div className={classNames(divClass, classes.select)}>
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
