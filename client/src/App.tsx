import { useState } from "react";
import { BiSolidVial } from "react-icons/bi";
import { FaListUl, FaPlus, FaRegCircle } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { MdGrain } from "react-icons/md";
import { RiBreadLine } from "react-icons/ri";
import LineChartComponent from "./Components/Linechart.component";
import LogFormToggle from "./Components/LogFormToggle.component";
import LogList from "./Components/LogList.component";
import { postCache } from "./utils/util";

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
    icon: <MdGrain />,
  },
  {
    label: "Carbs",
    style: "hover:bg-green-200",
    filter: graphFilter.CARBS,
    icon: <RiBreadLine />,
  },
  {
    label: "Insulin",
    style: "hover:bg-yellow-200",
    filter: graphFilter.INSULIN,
    icon: <BiSolidVial />,
  },
  {
    label: "All",
    style: "hover:bg-purple-200",
    filter: graphFilter.ALL,
    icon: <FaRegCircle />,
  },
];

function App() {
  const [filterType, setFilterType] = useState<graphFilter>(graphFilter.ALL);
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
        className={`rounded-xl p-2 w-full h-[16rem] drop-shadow-xl hover:bg-customblue-600 transition-colors duration-150 ease-in-out ${
          toggleForm || toggleLogList
            ? ""
            : "bg-gradient-to-b from-customblue-700 to-customblue-500"
        }`}
      >
        {toggleForm || toggleLogList ? (
          ""
        ) : (
          <LineChartComponent filter={filterType} />
        )}
      </div>
      <div className="flex justify-center space-x-4 w-full">
        {graphToggles.map((item) => (
          <button
            onClick={() => setFilterType(item.filter)}
            className={`bg-gradient-to-b from-customblue-700 to-customblue-500 w-[25%] h-[3rem] rounded-xl font-bold text-xs shadow-lg text-blue-950 uppercase ${item.style}`}
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
