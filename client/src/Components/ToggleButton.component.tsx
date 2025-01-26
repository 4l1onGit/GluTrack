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
        console.log(btnData.filter);
      }}
      className={`bg-gradient-to-b w-[25%] h-[3rem] lg:h-[4rem] rounded-xl font-bold text-xs shadow-lg text-blue-950 uppercase ${
        currentFilter == btnData.filter
          ? btnData.style
          : "from-customblue-700 to-customblue-500"
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
