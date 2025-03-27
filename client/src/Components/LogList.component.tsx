import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getFilteredLogsPaged, getLogsPage } from "../api/logApi";
import ListFilters from "./ListFilters.component";
import LogListCard from "./LogListCard";
import Pagination from "./Pagination.component";
import LogListCardSkeleton from "./Skeleton/LogListCardSkeleton";
import Slide from "./Slide.component";
import { logFilters } from "../utils/util";

interface Props {
  toggle: boolean;
  setState: (status: boolean) => void;
}

const LogList = ({ toggle, setState }: Props) => {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);

  const [maxPage, setMaxPage] = useState<number>(1);
  const [filters, setFilters] = useState<logFilters>({});

  console.log(filters);

  const {
    data: logsData,
    isLoading: logsDataLoading,
    isError: logsDataError,
  } = useQuery({
    queryFn: () =>
      filters ? getFilteredLogsPaged(filters, page) : getLogsPage(page),
    queryKey: ["logsPaged", { page }],
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["logsPaged"] });
  }, [page, queryClient, filters]);

  useEffect(() => {
    setMaxPage(logsData?.maxPage ? logsData.maxPage : 1);
  }, [logsData]);

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
            <ListFilters setFilters={setFilters} filters={filters} />
          </div>
        ) : (
          <div className="skeleton w-full h-full space-y-4"></div>
        )}
      </div>
      <div className="flex flex-col justify-center w-full h-full items-center">
        <ul className="w-full space-y-2 h-full">
          {logsData && logsData!.data.length > 0 ? (
            logsData.data?.map((log) => <LogListCard key={log.id} log={log} />)
          ) : (
            <>
              <LogListCardSkeleton />
              <LogListCardSkeleton />
              <LogListCardSkeleton />
              <LogListCardSkeleton />
            </>
          )}
        </ul>
      </div>
    </Slide>
  );
};

export default LogList;
