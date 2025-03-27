import { useContext, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { UserContext } from "../contexts/user.context";
import { mmolToMg } from "../utils/bgConversion";
import { glucoseUnit, Log } from "../utils/util";
import LogDropDown from "./LogDropDown.component";

interface Props {
  log: Log;
}

const LogListCard = ({ log }: Props) => {
  const { authUser } = useContext(UserContext);
  const [selectedLog, setSelectedLog] = useState<Log>();
  const [togglePopup, setTogglePopup] = useState(false);

  const handleSelectedLog = (log: Log) => {
    setSelectedLog(log);
    setTogglePopup(!togglePopup);
  };
  return (
    <li className="border-2 border-base-300 rounded-2xl bg-base-100 w-full">
      <div className="flex p-2 space-x-2 justify-between">
        <ul className="flex flex-col font-semibold">
          <li className="text-sm">{log.date}</li>
          <li>
            Glucose:{" "}
            {authUser?.unit.id == glucoseUnit.mg
              ? mmolToMg(log.glucose)
              : log.glucose}{" "}
            <span className="text-xs">
              {authUser?.unit.id == glucoseUnit.mg ? "mg/dl" : "mmol/L"}
            </span>
          </li>
          <li>
            Insulin: {log.insulin} <span className="text-xs">Units</span>
          </li>
          <li>
            Carbs: {log.carb}
            <span className="text-xs">G</span>
          </li>
          {selectedLog == log && togglePopup ? (
            <LogDropDown key={selectedLog?.id} log={selectedLog!} />
          ) : (
            ""
          )}
        </ul>
        <button
          className={` transition-all duration-300 ${
            selectedLog == log && togglePopup
              ? "text-primary"
              : "rotate-90 text-base"
          }`}
          onClick={() => handleSelectedLog(log)}
        >
          <IoMdArrowDropdown size={50} />
        </button>
      </div>
    </li>
  );
};

export default LogListCard;
