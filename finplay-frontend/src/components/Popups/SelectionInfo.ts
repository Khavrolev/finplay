import { StylesConfig } from "react-select";
import { IGame } from "../../utils/interfaces/gameData";

interface GroupOptions {
  value: number;
  label: string;
}

export const selectionStyles: StylesConfig<GroupOptions, true> = {
  container: (provided) => ({ ...provided }),
  control: (provided) => ({
    ...provided,
    padding: "12px 6px",
    minHeight: "72px",
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

export const getOptionsGames = (games: IGame[]): GroupOptions[] =>
  games.map((item) => {
    return { value: item.id, label: item.name };
  });
