import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { getLogsPage, getTotalLogs } from "../api/logApi";
import { Log } from "../utils/util";
import ListFilters from "./ListFilters.component";
import LogDropDown from "./LogDropDown.component";
import Slide from "./Slide.component";

interface Props {
  toggle: boolean;
  setState: (status: boolean) => void;
}

const LogList = ({ toggle, setState }: Props) => {
  const [page, setPage] = useState(1);

  const [selectedLog, setSelectedLog] = useState<Log>();
  const [togglePopup, setTogglePopup] = useState(false);
  // const [totalLogs, setTotalLogs] = useState(0);

  const {
    data: totalLogs,
    isLoading: totalLogsLoading,
    isError: totalLogsError,
  } = useQuery({
    queryFn: () => getTotalLogs(),
    queryKey: ["logsTotal"],
  });

  const {
    data: logsData,
    isLoading: logsDataLoading,
    isError: logsDataError,
  } = useQuery({
    queryFn: () => getLogsPage(page),
    queryKey: ["logsPaged"],
  });

  const handleSelectedLog = (log: Log) => {
    setSelectedLog(log);
    setTogglePopup(!togglePopup);
  };

  // useEffect(() => {
  //   const data = getTotalLogs();
  //   data
  //     .then((res) => {
  //       setTotalLogs(res);
  //       if (res > 0) {
  //         setTotalPages(Math.ceil(res / 5));
  //       }
  //     })
  //     .catch((e) => console.log(e));
  // }, [toggle]);

  // useEffect(() => {
  //   if (totalLogs > 0) {
  //     const data = getLogsPage(page);
  //     data
  //       .then((d) => {
  //         setLogs(d);
  //         setServerStatus(true);
  //       })
  //       .catch((e) => console.log(e));
  //   }
  // }, [page, totalLogs]);

  const pagination = new Array(totalLogs);
  if (Math.ceil(totalLogs! / 5) > 1) {
    for (let i = 0; i < pagination.length; i++) {
      pagination[i] = i;
    }
  }

  if (logsDataLoading || totalLogsLoading) {
    return <div className="">Loading...</div>;
  } else if (logsDataError || totalLogsError) {
    return <div>Error Loading Logs</div>;
  } else {
    return (
      <Slide setToggle={setState} toggle={toggle}>
        <div className="flex flex-col items-center w-full h-24 justify-center space-y-2">
          {pagination.length > 1 ? (
            <ul className="flex justify-center w-full items-center h-12 space-x-2 rounded-lg ">
              {page > 1 ? (
                <li className="flex items-center">
                  <button
                    className="text-blue-950 bg-white text-xl p-1 rounded-3xl "
                    onClick={() => setPage(page - 1)}
                  >
                    <FaChevronLeft />
                  </button>
                </li>
              ) : (
                ""
              )}

              {pagination.length
                ? pagination.map((_, index) => (
                    <li key={index}>
                      <button
                        className={`px-3  rounded-3xl font-semibold text-xl text-blue-950 ${
                          page == index + 1
                            ? " bg-gradient-to-l from-customblue-800 to-customblue-900 text-white"
                            : "bg-white"
                        }`}
                        onClick={() => {
                          if (index + 1 <= Math.ceil(totalLogs! / 5))
                            setPage(index + 1);
                        }}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))
                : ""}
              {page < Math.ceil(totalLogs! / 5) && pagination.length > 1 ? (
                <li className="flex items-center">
                  <button
                    className="text-blue-950 bg-white text-xl p-1 rounded-3xl"
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

          <ListFilters />
        </div>
        <div className="flex flex-col justify-center w-full h-full items-center">
          <ul className="w-full space-y-2 h-full">
            {logsData!.length > 0 ? (
              logsData?.map((log) => (
                <li
                  className="border-2 rounded-2xl border-customblue-600 bg-gradient-to-l from-customblue-800 to-customblue-900 w-full h-22"
                  key={`${log.id}`}
                >
                  <div className="flex p-2 space-x-2 justify-between">
                    <ul className="flex flex-col text-white font-semibold">
                      <li className="text-sm">{log.date}</li>
                      <li>
                        Glucose: {log.glucose}{" "}
                        <span className="text-xs">mmol/L</span>
                      </li>
                      <li>
                        Insulin: {log.insulin}{" "}
                        <span className="text-xs">Units</span>
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
                          ? " text-blue-950"
                          : "rotate-90 text-white"
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
                No Logs
              </li>
            )}
          </ul>
        </div>
      </Slide>
    );
  }
};

export default LogList;
