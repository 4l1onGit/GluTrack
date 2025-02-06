import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { getFilteredLogs } from "../api/logApi";
import { graphFilter, graphTimeFilter } from "../utils/util";

interface Props {
  typeFilter: graphFilter;
  timeFilter: graphTimeFilter;
}

const date = new Date(Date.now());

const getMonth = () => {
  return ("0" + (date.getMonth() + 1)).slice(-2);
};

const getDay = () => {
  return ("0" + date.getDate()).slice(-2);
};

const LineChartComponent = ({ typeFilter, timeFilter }: Props) => {
  const [dateValue, setDateValue] = useState<string>(getDay());
  const [yAxis, setYAxis] = useState<string>("carb");
  const queryClient = useQueryClient();

  const [max, setMax] = useState<number>();

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getFilteredLogs(timeFilter, dateValue),
    queryKey: ["logsGraphFilter"],
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["logsGraphFilter"] });
  }, [timeFilter, dateValue]);

  if (
    timeFilter == graphTimeFilter.YEAR &&
    dateValue != date.getFullYear().toString()
  ) {
    setDateValue(date.getFullYear().toString());
  }

  if (timeFilter == graphTimeFilter.MONTH && dateValue != getMonth()) {
    setDateValue(getMonth());
  }

  if (timeFilter == graphTimeFilter.WEEK && dateValue != getDay().toString()) {
    setDateValue(getDay());
  }

  if (timeFilter == graphTimeFilter.DAY && dateValue != getDay()) {
    setDateValue(getDay());
  }

  useEffect(() => {
    if (typeFilter == graphFilter.ALL) {
      if (yAxis != "all") {
        setYAxis("all");
      }

      if (data) {
        const maxY = Math.max(
          ...data.map((d) => d.carb),
          ...data.map((d) => d.insulin),
          ...data.map((d) => d.glucose)
        );
        setMax(maxY);
      }
    }
    if (typeFilter == graphFilter.INSULIN) {
      if (yAxis != "insulin") {
        setYAxis("insulin");
      }
      if (data) {
        setMax(Math.max(...data.map((d) => d.insulin)));
      }
    }

    if (typeFilter == graphFilter.CARBS) {
      if (yAxis != "carb") {
        setYAxis("carb");
      }

      if (data) {
        setMax(Math.max(...data.map((d) => d.carb)));
      }
    }

    if (typeFilter == graphFilter.BLOOD_SUGAR) {
      if (yAxis != "glucose") {
        setYAxis("glucose");
      }

      if (data) {
        setMax(Math.max(...data.map((d) => d.glucose)));
      }
    }
  }, [dateValue, max, yAxis, typeFilter, data]);

  if (data?.length == 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <h2 className="text-2xl font-semibold uppercase text-blue-950 tracking-wider">
          No Logs
        </h2>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex justify-center items-center h-full">
        <h2 className="text-2xl font-semibold uppercase text-blue-950 tracking-wider">
          Error
        </h2>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <h2 className="text-2xl font-semibold uppercase text-blue-950 tracking-wider">
          Loading...
        </h2>
      </div>
    );
  }
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ right: 50, top: 50 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={false} />
        <YAxis dataKey={yAxis} domain={[0, max!]} />

        <Legend />
        {typeFilter === graphFilter.CARBS || typeFilter === graphFilter.ALL ? (
          <Line
            type="monotone"
            dataKey="carb"
            stroke="#92ffad"
            strokeWidth={3}
          />
        ) : null}
        {typeFilter === graphFilter.BLOOD_SUGAR ||
        typeFilter === graphFilter.ALL ? (
          <Line
            type="monotone"
            dataKey="glucose"
            stroke="#ffbc3f"
            strokeWidth={3}
          />
        ) : null}
        {typeFilter === graphFilter.INSULIN ||
        typeFilter === graphFilter.ALL ? (
          <Line
            type="monotone"
            dataKey="insulin"
            stroke="#fffd6d"
            strokeWidth={3}
          />
        ) : null}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
