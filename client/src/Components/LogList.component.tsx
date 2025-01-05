import axios from "axios";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdClose } from "react-icons/io";
import { Log } from "../utils/util";
import LogDropDown from "./LogDropDown.component";

interface Props {
  toggle: boolean;
  setState: (status: boolean) => void;
}

const LogList = ({ toggle, setState }: Props) => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [serverStatus, setServerStatus] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedLog, setSelectedLog] = useState<Log>();
  const [togglePopup, setTogglePopup] = useState(false);

  const handleSelectedLog = (log: Log) => {
    setSelectedLog(log);
    setTogglePopup(!togglePopup);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_URL}/logTotal`).then((res) => {
          setTotalPages(Math.ceil(res.data / 5));
        });
        setServerStatus(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    try {
      if (page < 1) {
        setPage(1);
      }
      if (page > totalPages) {
        setPage(totalPages);
      }
      const fetchData = async () => {
        await axios
          .get(`${import.meta.env.VITE_URL}/log/page/${page}`)
          .then((res) => {
            setLogs(res.data);
            setServerStatus(true);
          });
      };
      fetchData();
    } catch (error) {
      console.log(error);
      setServerStatus(false);
    }
  }, [page, totalPages]);

  const pagination = new Array(totalPages);
  for (let i = 0; i < pagination.length; i++) {
    pagination[i] = i;
  }

  return (
    <div
      className={
        toggle
          ? "bg-customblue-500 flex flex-col overflow-hidden items-start absolute inset-x-0 bottom-0 w-full h-[70%] max-h-[70%] border-b-customblue-500 rounded-t-2xl border-t-2 transition-all duration-300 border-blue-200"
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
        {serverStatus ? (
          <ul className="flex justify-center w-full items-center h-12 space-x-1">
            {page > 1 ? (
              <li className="flex items-center">
                <button
                  className="text-[#FFDFBF] text-4xl "
                  onClick={() => setPage(page - 1)}
                >
                  <FaChevronLeft />
                </button>
              </li>
            ) : (
              ""
            )}

            {pagination.map((_, index) => (
              <li key={index}>
                <button
                  className="px-3 border-2 rounded-md border-customblue bg-[#FFDFBF] text-2xl text-customblue-950"
                  onClick={() => setPage(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            {page < totalPages ? (
              <li className="flex items-center">
                <button
                  className="text-[#FFDFBF] text-4xl"
                  onClick={() => setPage(page + 1)}
                >
                  <FaChevronRight />
                </button>
              </li>
            ) : (
              ""
            )}
          </ul>
        ) : (
          ""
        )}

        <div className="flex flex-col justify-center w-full h-full items-center">
          <ul className="w-full space-y-2 h-full">
            {serverStatus ? (
              logs.map((log) => (
                <li
                  className="border-2 rounded-2xl border-customblue-600 bg-gradient-to-l from-customblue-800 to-customblue-900 w-full h-22"
                  key={`${log.id}`}
                >
                  <div className="flex p-2 space-x-2 justify-between">
                    <ul className="flex flex-col text-[#FFDFBF] font-semibold uppercase text-sm">
                      <li>Glucose: {log.glucose}</li>
                      <li>Insulin: {log.insulin}</li>
                      <li>carb: {log.carb}</li>
                      {selectedLog == log && togglePopup ? (
                        <LogDropDown key={selectedLog?.id} log={selectedLog!} />
                      ) : (
                        ""
                      )}
                    </ul>
                    <button
                      className={`text-[#FFDFBF] transition-transform duration-300 ${
                        selectedLog == log && togglePopup ? "" : "rotate-90"
                      }`}
                      onClick={() => handleSelectedLog(log)}
                    >
                      <IoMdArrowDropdown size={50} />
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
