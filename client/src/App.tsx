import { useState } from "react";
import LineChartComponent from "./Components/Linechart.component";

enum graphFilter {
  BLOOD_SUGAR = "sugar",
  CARBS = "carbs",
  INSULIN = "insulin",
  ALL = "all",
}

const graphToggles = [
  {
    label: "Sugar",
    style: "hover:bg-orange-200",
    filter: graphFilter.BLOOD_SUGAR,
  },
  {
    label: "Carbs",
    style: "hover:bg-green-200",
    filter: graphFilter.CARBS,
  },
  {
    label: "Insulin",
    style: "hover:bg-yellow-200",
    filter: graphFilter.INSULIN,
  },
  {
    label: "All",
    style: "hover:bg-purple-200",
    filter: graphFilter.ALL,
  },
];

const logActions = [
  {
    label: "Log Insulin",
    action: () => {},
  },
  {
    label: "Log Mood",
    action: () => {},
  },
];

function App() {
  const [filterType, setFilterType] = useState(graphFilter.ALL);
  return (
    <div className="flex flex-col p-4 pt-8 h-full items-center justify-center space-y-6 w-[95%] mx-auto">
      <div className="bg-customblue-500 rounded-xl p-2 w-full h-[16rem] hover:bg-customblue-600 transition-colors duration-150 ease-in-out">
        <LineChartComponent filter={filterType} />
      </div>
      <div className="flex justify-center space-x-4 w-full">
        {graphToggles.map((item) => (
          <button
            onClick={() => setFilterType(item.filter)}
            className={`bg-customblue-500 w-[25%] h-[3rem] rounded-xl font-bold text-sm text-blue-950 ${item.style}`}
            key={item.label}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="flex justify-center space-x-4 w-full">
        {logActions.map((action) => (
          <button
            onClick={action.action}
            key={action.label}
            className="bg-customblue-500 w-[11rem] h-[8rem] rounded-xl hover:bg-customblue-600 transition-colors duration-150 ease-in-out font-bold text-blue-950"
          >
            {action.label}
          </button>
        ))}
      </div>
      <div className="bg-customblue-500 w-full h-[13rem] rounded-xl hover:bg-customblue-600 transition-colors duration-150 ease-in-out"></div>
    </div>
  );
}

export default App;
