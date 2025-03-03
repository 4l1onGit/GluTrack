import { useState } from "react";
import { BiSolidVial } from "react-icons/bi";
import { FaListUl, FaPlus, FaRegCircle } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { MdGrain } from "react-icons/md";
import { RiBreadLine } from "react-icons/ri";
import LineChartComponent from "./Components/Linechart.component";
import LogFormToggle from "./Components/LogFormToggle.component";
import LogList from "./Components/LogList.component";
import {
  btnToggles,
  graphFilter,
  graphTimeFilter,
  postCache,
} from "./utils/util";
import Login from "./Components/Login.component";
import FilterRow from "./Components/FiltersRow.component";
import Setting from "./Components/Setting.component";

const graphToggles: btnToggles[] = [
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

const graphTimeToggles: btnToggles[] = [
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

  const [toggleSetting, setToggleSetting] = useState<boolean>(false);

  if (navigator.onLine && localStorage.length) {
    postCache();
  }
  if (
    sessionStorage.getItem("jwt") === null ||
    sessionStorage.getItem("jwt") === ""
  ) {
    return <Login />;
  } else {
    return (
      <div className="relative flex flex-col h-screen justify-between px-4 space-y-6 w-full mx-auto lg:items-center">
        <div
          className={
            toggleForm || toggleLogList || toggleSetting
              ? "absolute inset-0 h-screen w-full bg-black bg-opacity-15 backdrop-blur-sm"
              : "hidden"
          }
        ></div>
        <div
          className={
            toggleForm || toggleLogList || toggleSetting
              ? "transition-all duration-150 ease-out opacity-0"
              : `bg-gradient-to-b from-customblue-700 to-customblue-500 rounded-xl p-2 w-full h-[16rem] lg:h-[40vh] lg:w-[40vw] drop-shadow-xl hover:bg-customblue-600 transition-all opacity-100 duration-500 ease-linear`
          }
        >
          <LineChartComponent typeFilter={filterType} timeFilter={timeFilter} />
        </div>
        <FilterRow
          btnsData={graphTimeToggles}
          currentFilter={timeFilter}
          setFilter={setTimeFilter}
        />
        <FilterRow
          btnsData={graphToggles}
          currentFilter={filterType}
          setFilter={setFilterType}
        />

        <div className="flex justify-center space-x-4 w-full lg:w-[40vw]">
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
        <div className="flex space-x-4 w-full h-[13rem] lg:w-[40vw] lg:h-[16vh]">
          <button
            onClick={() => setToggleLogList(!toggleLogList)}
            className="bg-gradient-to-br from-customblue-700 to-customblue-500 shadow-lg w-full text-[4rem] text-opacity-70 flex justify-center items-center rounded-xl hover:bg-customblue-600 transition-colors duration-150 ease-in-out text-center text-blue-950 font-bold"
          >
            <div className="flex flex-col items-center space-y-4">
              <FaListUl />
              <span className="text-sm font-bold tracking-wider">
                view logs
              </span>
            </div>
          </button>
          <button
            onClick={() => setToggleSetting(!toggleSetting)}
            className="bg-gradient-to-bl from-customblue-700 to-customblue-500 shadow-lg w-full text-[4.5rem] text-opacity-70 flex justify-center items-center rounded-xl hover:bg-customblue-600 transition-colors duration-150 ease-in-out text-blue-950 font-bold"
          >
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
        <Setting
          toggle={toggleSetting}
          setToggle={() => {
            setToggleSetting(!toggleSetting);
          }}
        />
      </div>
    );
  }
}

export default App;
