import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdArrowDropdown, IoMdClose } from "react-icons/io";
import { Log } from "../utils/util";

interface Props {
  toggle: boolean;
  setState: (status: boolean) => void;
}

const LogList = ({ toggle, setState }: Props) => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [serverStatus, setServerStatus] = useState<boolean>(false);

  useEffect(() => {
    try {
      axios.get(`${import.meta.env.VITE_URL}/log`).then((res) => {
        setLogs(res.data);
        setServerStatus(true);
      });
    } catch (error) {
      console.log(error);
    }
  }, [toggle]);

  return (
    <div
      className={
        toggle
          ? "bg-customblue-500 flex items-start absolute inset-x-0 bottom-0 w-full h-[70%] max-h-[70%] border-b-customblue-500 rounded-t-2xl border-t-2 transition-all duration-300 border-blue-200"
          : "max-h-0"
      }
    >
      <div
        className={
          toggle ? "flex flex-col w-full items-end p-4 space-y-4" : "hidden"
        }
      >
        <button onClick={() => setState(false)}>
          <IoMdClose />
        </button>
        <div className="flex flex-col justify-center w-full h-full items-center">
          <ul className="w-full space-y-2">
            {serverStatus ? (
              logs.map((log) => (
                <li
                  className="border-2 rounded-2xl border-customblue-600 bg-gradient-to-l from-customblue-800 to-customblue-900 w-full h-22"
                  key={log.date}
                >
                  <div className="flex p-2 space-x-2 justify-between">
                    <ul className="flex flex-col text-[#FFDFBF] font-semibold uppercase text-sm">
                      <li>Glucose: {log.glucose}</li>
                      <li>Insulin: {log.insulin}</li>
                      <li>carb: {log.carb}</li>
                    </ul>
                    <button className="text-[#FFDFBF]">
                      <IoMdArrowDropdown className="rotate-90" size={50} />
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className="text-center uppercase text-md font-semibold">
                Server error
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LogList;
