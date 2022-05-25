import { FC } from "react";
import Select from "react-select";
import { IOption } from "../../utils/interfaces/components";
import { singleSelectionStyles } from "./SelectionInfo";
import classes from "./Select.module.css";

interface SingleSelectionProps {
  selectedItem: number;
  handleSelectedItem: (group: number) => void;
  options: IOption[];
  placeholder: string;
}

const SingleSelection: FC<SingleSelectionProps> = ({
  selectedItem,
  handleSelectedItem,
  options,
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
      />
      <div
        style={{ opacity: selectedItem > 0 ? "0.5" : "0" }}
        className={classes.select__placeholder}
      >
        {placeholder}
      </div>
    </div>
  );
};

export default SingleSelection;
