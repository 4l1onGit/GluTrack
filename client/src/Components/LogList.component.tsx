import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { getLogsPage } from "../api/logApi";
import { glucoseUnit, Log } from "../utils/util";
import ListFilters from "./ListFilters.component";
import LogDropDown from "./LogDropDown.component";
import Pagination from "./Pagination.component";
import Slide from "./Slide.component";
import { UserContext } from "../contexts/user.context";
import { mmolToMg } from "../utils/bgConversion";

interface Props {
  toggle: boolean;
  setState: (status: boolean) => void;
}

const LogList = ({ toggle, setState }: Props) => {
  const queryClient = useQueryClient();
  const { authUser } = useContext(UserContext);
  const [page, setPage] = useState(1);
  const [selectedLog, setSelectedLog] = useState<Log>();
  const [togglePopup, setTogglePopup] = useState(false);
  const [maxPage, setMaxPage] = useState<number>(1);

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

  useEffect(() => {
    setMaxPage(logsData?.maxPage ? logsData.maxPage : 1);
  }, [logsData]);

  const handleSelectedLog = (log: Log) => {
    setSelectedLog(log);
    setTogglePopup(!togglePopup);
  };

  const pagination = new Array(logsData ? logsData.maxPage : 1);

  if (logsData?.totalRecords ? Math.ceil(logsData.totalRecords! / 5) : 1 > 1) {
    for (let i = 0; i < pagination.length; i++) {
      pagination[i] = i;
    }
  }

  return (
    <Slide setToggle={setState} toggle={toggle}>
      <div className="flex flex-col items-center w-full h-24 justify-center space-y-2">
        {logsDataLoading ?? <div className="">Loading...</div>}
        {logsDataError ?? <div className="">Error</div>}
        {!logsDataLoading ? (
          <div className="flex flex-col w-full space-y-4">
            <Pagination
              maxPage={maxPage}
              page={page}
              setPage={setPage}
              pages={pagination}
            />
            <ListFilters />
          </div>
        ) : (
          ""
        )}
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
                      Glucose:{" "}
                      {authUser?.unit.id == glucoseUnit.mg
                        ? mmolToMg(log.glucose)
                        : log.glucose}{" "}
                      <span className="text-xs">
                        {authUser?.unit.id == glucoseUnit.mg
                          ? "mg/dl"
                          : "mmol/L"}
                      </span>
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
