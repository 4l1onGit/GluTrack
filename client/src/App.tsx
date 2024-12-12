import { useState } from "react";
import LineChartComponent from "./Components/Linechart.component";
import LogForm from "./Components/LogForm.component";

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

function App() {
  const [filterType, setFilterType] = useState<graphFilter>(graphFilter.ALL);
  const [toggleForm, setToggleForm] = useState<boolean>(false);
  const [toggleLogList, setToggleLogList] = useState<boolean>(false);
  return (
    <div className="relative flex flex-col p-4 h-screen space-y-6 w-full mx-auto">
      <div
        className={
          toggleForm
            ? "absolute inset-0 h-screen w-full bg-black bg-opacity-40 backdrop-blur-sm"
            : "hidden"
        }
      ></div>
      <div className="bg-customblue-500 rounded-xl p-2 w-full h-[16rem] hover:bg-customblue-600 transition-colors duration-150 ease-in-out">
        {!toggleForm ? <LineChartComponent filter={filterType} /> : ""}
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
        <button
          onClick={() => setToggleForm(!toggleForm)}
          className="bg-customblue-500 w-full h-[8rem] rounded-xl hover:bg-customblue-600 transition-colors duration-150 ease-in-out font-bold text-blue-950"
        >
          Log
        </button>
      </div>
      <div className="flex space-x-4 w-full h-[13rem]">
        <button
          onClick={() => setToggleLogList(!toggleLogList)}
          className="bg-customblue-500 w-full rounded-xl hover:bg-customblue-600 transition-colors duration-150 ease-in-out text-center text-blue-950 font-bold"
        >
          <h4>View Logs</h4>
        </button>
        <button className="bg-customblue-500 w-full rounded-xl hover:bg-customblue-600 transition-colors duration-150 ease-in-out text-blue-950 font-bold">
          <h4>New Option</h4>
        </button>
      </div>

      <LogForm
        toggle={toggleForm}
        setState={() => {
          setToggleForm(!toggleForm);
        }}
      />
    </div>
  );
}

export default App;
