import { useState } from "react";
import { BiSolidVial } from "react-icons/bi";
import { FaListUl, FaPlus, FaRegCircle } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { MdGrain } from "react-icons/md";
import { RiBreadLine } from "react-icons/ri";
import FilterRow from "./Components/FiltersRow.component";
import LineChartComponent from "./Components/Linechart.component";
import LogFormCreate from "./Components/LogFormCreate.component";
import Login from "./Components/Login.component";
import LogList from "./Components/LogList.component";
import Setting from "./Components/Setting.component";
import {
  btnToggles,
  graphFilter,
  graphTimeFilter,
  postCache,
} from "./utils/util";

const graphToggles: btnToggles[] = [
  {
    label: "Sugar",
    style: "bg-primary",
    filter: graphFilter.BLOOD_SUGAR,
    icon: <MdGrain />,
  },
  {
    label: "Carbs",
    style: "bg-primary",
    filter: graphFilter.CARBS,
    icon: <RiBreadLine />,
  },
  {
    label: "Insulin",
    style: "bg-primary",
    filter: graphFilter.INSULIN,
    icon: <BiSolidVial />,
  },
  {
    label: "All",
    style: "bg-primary",
    filter: graphFilter.ALL,
    icon: <FaRegCircle />,
  },
];

const graphTimeToggles: btnToggles[] = [
  {
    label: "Day",
    style: "bg-primary",
    filter: graphTimeFilter.DAY,
  },
  {
    label: "Week",
    style: "bg-primary",
    filter: graphTimeFilter.WEEK,
  },
  {
    label: "Month",
    style: "bg-primary",
    filter: graphTimeFilter.MONTH,
  },
  {
    label: "Year",
    style: "bg-primary",
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
  const menuBtnStyle =
    "bg-base-100 shadow-lg w-full text-[4.5rem] flex justify-center items-center border-1 border-base-300 rounded-xl hover:bg-base-300 transition-colors duration-150 ease-in-out text-base font-bold";

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
      <div className="relative flex flex-col h-screen justify-between px-4 py-6 space-y-6 w-full mx-auto lg:items-center bg-base-200">
        <div
          className={
            toggleForm || toggleLogList || toggleSetting
              ? "absolute inset-0 h-screen w-full bg-black opacity-15 backdrop-blur-xs"
              : "hidden"
          }
        ></div>
        <div
          className={
            toggleForm || toggleLogList || toggleSetting
              ? "transition-all duration-150 ease-out opacity-0"
              : `bg-base-100 border-1 border-base-300 rounded-xl p-2 w-full h-[16rem] lg:h-[40vh] lg:w-[40vw] drop-shadow-xl transition-all opacity-100 duration-500 ease-linear`
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

        <div className="flex justify-center space-x-4 w-full lg:w-[40vw] h-[15vh]">
          <button
            onClick={() => setToggleForm(!toggleForm)}
            className={menuBtnStyle}
          >
            <div className="flex flex-col">
              <FaPlus />{" "}
              <span className="text-sm font-bold tracking-wider">add log</span>
            </div>
          </button>
        </div>
        <div className="flex space-x-4 w-full h-[22vh] lg:w-[40vw] lg:h-[16vh]">
          <button
            onClick={() => setToggleLogList(!toggleLogList)}
            className={menuBtnStyle}
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
            className={menuBtnStyle}
          >
            <div className="flex flex-col items-center space-y-4">
              <IoIosSettings />
              <span className="text-sm font-bold tracking-wider">settings</span>
            </div>
          </button>
        </div>

        <LogFormCreate
          toggle={toggleForm}
          setState={() => {
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
