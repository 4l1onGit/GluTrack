import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { graphTimeFilter, graphFilter, Log } from "../utils/util";
import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

interface Props {
  typeFilter: graphFilter;
  timeFilter: graphTimeFilter;
}

const getAxiosConfig = (): AxiosRequestConfig => {
  const token = sessionStorage.getItem("jwt");
  return {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  };
};

const date = new Date(Date.now());

const getMonth = () => {
  return "0" + (date.getMonth() + 1).toString();
};

const getDay = () => {
  return ("0" + date.getDate()).slice(-2);
};

const LineChartComponent = ({ typeFilter, timeFilter }: Props) => {
  const [dateValue, setDateValue] = useState<string>();
  const [yAxis, setYAxis] = useState<string>("carb");
  const [data, setData] = useState<Log[]>();

  const [max, setMax] = useState<number>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get(
            `${
              import.meta.env.VITE_URL
            }/api/log/filter/${timeFilter}/${dateValue}`,
            getAxiosConfig()
          )
          .then((res) => {
            setData(res.data);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
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

  if (typeFilter == graphFilter.INSULIN && yAxis != "insulin") {
    setYAxis("insulin");
    if (data) {
      setMax(Math.max(...data.map((d) => d.insulin)));
    }
  }

  if (
    (typeFilter == graphFilter.CARBS || typeFilter == graphFilter.ALL) &&
    yAxis != "carb"
  ) {
    setYAxis("carb");

    if (data) {
      setMax(Math.max(...data.map((d) => d.carb)));
    }
  }

  if (typeFilter == graphFilter.BLOOD_SUGAR && yAxis != "glucose") {
    setYAxis("glucose");
    if (data) {
      setMax(Math.max(...data.map((d) => d.glucose)));
    }
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
