import { useState } from "react";
import { BiSolidVial } from "react-icons/bi";
import { FaListUl, FaPlus, FaRegCircle } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { MdGrain } from "react-icons/md";
import { RiBreadLine } from "react-icons/ri";
import LineChartComponent from "./Components/Linechart.component";
import LogFormToggle from "./Components/LogFormToggle.component";
import LogList from "./Components/LogList.component";
import { graphFilter, graphTimeFilter, postCache } from "./utils/util";

const graphToggles = [
  {
    label: "Sugar",
    style: "from-orange-200 to-orange-300",
    filter: graphFilter.BLOOD_SUGAR,
    icon: <MdGrain />,
  },
  {
    label: "Carbs",
    style: "from-green-200 to-green-300",
    filter: graphFilter.CARBS,
    icon: <RiBreadLine />,
  },
  {
    label: "Insulin",
    style: "from-yellow-200 to-yellow-300",
    filter: graphFilter.INSULIN,
    icon: <BiSolidVial />,
  },
  {
    label: "All",
    style: "from-purple-200 to-purple-300",
    filter: graphFilter.ALL,
    icon: <FaRegCircle />,
  },
];

const graphTimeToggles = [
  {
    label: "Day",
    style: "from-orange-200 to-orange-300",
    filter: graphTimeFilter.DAY,
  },
  {
    label: "Week",
    style: "from-green-200 to-green-300",
    filter: graphTimeFilter.WEEK,
  },
  {
    label: "Month",
    style: "from-yellow-200 to-yellow-300",
    filter: graphTimeFilter.MONTH,
  },
  {
    label: "Year",
    style: "from-purple-200 to-purple-300",
    filter: graphTimeFilter.YEAR,
  },
];

function App() {
  const [filterType, setFilterType] = useState<graphFilter>(graphFilter.ALL);
  const [timeFilter, setTimeFilter] = useState<graphTimeFilter>(
    graphTimeFilter.WEEK
  );
  const [toggleForm, setToggleForm] = useState<boolean>(false);
  const [toggleLogList, setToggleLogList] = useState<boolean>(false);

  if (navigator.onLine && localStorage.length) {
    postCache();
  }

  return (
    <div className="relative flex flex-col p-4 h-screen space-y-6 w-full mx-auto">
      <div
        className={
          toggleForm || toggleLogList
            ? "absolute inset-0 h-screen w-full bg-black bg-opacity-15 backdrop-blur-sm"
            : "hidden"
        }
      ></div>
      <div
        className={`rounded-xl p-2 w-full h-[16rem] drop-shadow-xl hover:bg-customblue-600 transition-colors  duration-150 ease-in-out ${
          toggleForm || toggleLogList
            ? ""
            : "bg-gradient-to-b from-customblue-700 to-customblue-500"
        }`}
      >
        {toggleForm || toggleLogList ? (
          ""
        ) : (
          <LineChartComponent typeFilter={filterType} timeFilter={timeFilter} />
        )}
      </div>
      <div className="flex justify-center space-x-4 w-full">
        {graphTimeToggles.map((item) => (
          <button
            onClick={() => setTimeFilter(item.filter)}
            className={`bg-gradient-to-b  w-[25%] h-[3rem] rounded-xl font-bold text-xs shadow-lg text-blue-950 uppercase ${
              timeFilter == item.filter
                ? item.style
                : "from-customblue-700 to-customblue-500"
            }`}
            key={item.label}
          >
            <div className="flex justify-center">
              <p className="p-1">{item.label}</p>{" "}
            </div>
          </button>
        ))}
      </div>
      <div className="flex justify-center space-x-4 w-full">
        {graphToggles.map((item) => (
          <button
            onClick={() => setFilterType(item.filter)}
            className={`bg-gradient-to-b from-customblue-700 to-customblue-500 w-[25%] h-[3rem] rounded-xl font-bold text-xs shadow-lg text-blue-950 uppercase ${
              filterType == item.filter
                ? item.style
                : "from-customblue-700 to-customblue-500"
            }`}
            key={item.label}
          >
            <div className="flex justify-center">
              <p className="p-1">{item.label}</p>{" "}
              <span className="text-xs">{item.icon}</span>
            </div>
          </button>
        ))}
      </div>
      <div className="flex justify-center space-x-4 w-full">
        <button
          onClick={() => setToggleForm(!toggleForm)}
          className="bg-gradient-to-b from-customblue-700 to-customblue-500 w-full h-[8rem]  text-[4.5rem] flex justify-center items-center text-opacity-70 shadow-lg rounded-xl hover:bg-customblue-600 transition-colors duration-150 ease-in-out font-bold text-blue-950"
        >
          <div className="flex flex-col">
            <FaPlus />{" "}
            <span className="text-sm font-bold tracking-wider">add log</span>
          </div>
        </button>
      </div>
      <div className="flex space-x-4 w-full h-[13rem]">
        <button
          onClick={() => setToggleLogList(!toggleLogList)}
          className="bg-gradient-to-br from-customblue-700 to-customblue-500 shadow-lg w-full text-[4rem] text-opacity-70 flex justify-center items-center rounded-xl hover:bg-customblue-600 transition-colors duration-150 ease-in-out text-center text-blue-950 font-bold"
        >
          <div className="flex flex-col items-center space-y-4">
            <FaListUl />
            <span className="text-sm font-bold tracking-wider">view logs</span>
          </div>
        </button>
        <button className="bg-gradient-to-bl from-customblue-700 to-customblue-500 shadow-lg w-full text-[4.5rem] text-opacity-70 flex justify-center items-center rounded-xl hover:bg-customblue-600 transition-colors duration-150 ease-in-out text-blue-950 font-bold">
          <div className="flex flex-col items-center space-y-4">
            <IoIosSettings />
            <span className="text-sm font-bold tracking-wider">settings</span>
          </div>
        </button>
      </div>

      <LogFormToggle
        toggle={toggleForm}
        setToggle={() => {
          setToggleForm(!toggleForm);
        }}
      />

      <LogList
        toggle={toggleLogList}
        setState={() => {
          setToggleLogList(!toggleLogList);
        }}
      />
    </div>
  );
}

export default App;
