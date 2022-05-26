import { FC } from "react";
import Select from "react-select";
import { IOption } from "../../utils/interfaces/components";
import { singleSelectionStyles } from "./SelectionInfo";
import classes from "./Select.module.css";

interface SingleSelectionProps {
  selectedItem: number;
  handleSelectedItem: (group: number) => void;
  options: IOption[];
  disabled: boolean;
  placeholder: string;
}
const SingleSelection: FC<SingleSelectionProps> = ({
  selectedItem,
  handleSelectedItem,
  options,
  disabled,
  placeholder,
}) => {
  return (
    <div className={classes.select}>
      <Select<IOption>
        styles={singleSelectionStyles}
        options={options}
        value={options?.find((item) => item.value === selectedItem)}
        placeholder={placeholder}
        onChange={(event) => handleSelectedItem(event ? event.value : -1)}
        isMulti={undefined}
        isClearable
        isSearchable
        isDisabled={disabled}
      />
      <div
        style={{ opacity: selectedItem !== -1 ? "0.5" : "0" }}
        className={classes.select__placeholder}
      >
        {placeholder}
      </div>
    </div>
  );
};

export default SingleSelection;
