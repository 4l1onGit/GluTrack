import { btnToggles, graphFilter, graphTimeFilter } from "../utils/util";

interface Props {
  btnData: btnToggles;
  setFilter:
    | React.Dispatch<React.SetStateAction<graphTimeFilter>>
    | React.Dispatch<React.SetStateAction<graphFilter>>;
  currentFilter: graphFilter | graphTimeFilter;
}

const ToggleButton = ({ btnData, setFilter, currentFilter }: Props) => {
  return (
    <button
      onClick={() => {
        //@ts-ignore
        setFilter(btnData.filter);
      }}
      className={`bg-linear-to-b w-[25%] h-[6vh] lg:h-[4rem] rounded-xl font-bold text-xs shadow-lg uppercase border-1 border-base-300 ${
        currentFilter == btnData.filter ? btnData.style : "bg-base-100"
      }`}
      key={btnData.label}
    >
      <div className="flex justify-center">
        <p className="p-1">{btnData.label}</p>{" "}
      </div>
    </button>
  );
};

export default ToggleButton;
