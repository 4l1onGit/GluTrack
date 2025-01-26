import React from "react";
import ToggleButton from "./ToggleButton.component";
import { btnToggles, graphFilter, graphTimeFilter } from "../utils/util";

interface Props {
  btnsData: btnToggles[];
  setFilter:
    | React.Dispatch<React.SetStateAction<graphTimeFilter>>
    | React.Dispatch<React.SetStateAction<graphFilter>>;
  currentFilter: graphFilter | graphTimeFilter;
}

const FilterRow = ({ btnsData, currentFilter, setFilter }: Props) => {
  return (
    <div className="flex justify-center space-x-4 w-full lg:w-[40vw]">
      {btnsData.map((item) => (
        <ToggleButton
          key={item.filter}
          btnData={item}
          currentFilter={currentFilter}
          setFilter={setFilter}
        />
      ))}
    </div>
  );
};

export default FilterRow;
