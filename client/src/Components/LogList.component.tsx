import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { getLogsPage } from "../api/logApi";
import { Log } from "../utils/util";
import ListFilters from "./ListFilters.component";
import LogDropDown from "./LogDropDown.component";
import Slide from "./Slide.component";

interface Props {
  toggle: boolean;
  setState: (status: boolean) => void;
}

const LogList = ({ toggle, setState }: Props) => {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [selectedLog, setSelectedLog] = useState<Log>();
  const [togglePopup, setTogglePopup] = useState(false);

  const {
    data: logsData,
    isLoading: logsDataLoading,
    isError: logsDataError,
  } = useQuery({
    queryFn: () => getLogsPage(page),
    queryKey: ["logsPaged", { page }],
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["logsPaged"] });
  }, [page, queryClient]);

  const handleSelectedLog = (log: Log) => {
    setSelectedLog(log);
    setTogglePopup(!togglePopup);
  };

  const pagination = new Array(
    logsData?.totalRecords ? Math.ceil(logsData.totalRecords! / 5) : 1
  );

  if (logsData?.totalRecords ? Math.ceil(logsData.totalRecords! / 5) : 1 > 1) {
    for (let i = 0; i < pagination.length; i++) {
      pagination[i] = i;
    }
  }

  console.log(logsData);

  return (
    <Slide setToggle={setState} toggle={toggle}>
      <div className="flex flex-col items-center w-full h-24 justify-center space-y-2">
        {logsDataLoading ?? <div className="">Loading...</div>}
        {logsDataError ?? <div className="">Error</div>}
        {!logsDataLoading ? (
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

            {pagination.map((_, index) => (
              <li key={index}>
                <button
                  className={`px-3  rounded-3xl font-semibold text-xl text-blue-950 ${
                    page == index + 1
                      ? " bg-gradient-to-l from-customblue-800 to-customblue-900 text-white"
                      : "bg-white"
                  }`}
                  onClick={() => {
                    if (index + 1 <= Math.ceil(logsData!.totalRecords / 5))
                      setPage(index + 1);
                  }}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            {page < Math.ceil(logsData!.totalRecords / 5) &&
            pagination.length > 1 ? (
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
          {logsData && logsData!.data.length > 0 ? (
            logsData.data?.map((log) => (
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
};

export default LogList;
