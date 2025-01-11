import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { graphTimeFilter, graphFilter } from "../utils/util";
import { useEffect, useState } from "react";
import axios from "axios";

interface Props {
  typeFilter: graphFilter;
  timeFilter: graphTimeFilter;
}

const date = new Date();

const getMonth = () => {
  return "0" + (date.getMonth() + 1).toString();
};

const getDay = () => {
  return "0" + date.getDay().toString();
};

const LineChartComponent = ({ typeFilter, timeFilter }: Props) => {
  const [dateValue, setDateValue] = useState<string>();
  const [yAxis, setYAxis] = useState<string>("carb");
  const [data, setData] = useState();

  const [max, setMax] = useState<number>();
  const [min, setMin] = useState<number>();

  if (
    timeFilter == graphTimeFilter.YEAR &&
    dateValue != date.getFullYear().toString()
  ) {
    setDateValue(date.getFullYear().toString());
  }

  if (timeFilter == graphTimeFilter.MONTH && dateValue != getMonth()) {
    setDateValue(getMonth());
  }

  if (
    timeFilter == graphTimeFilter.WEEK &&
    dateValue != date.getDay().toString()
  ) {
    setDateValue(date.getDay().toString());
  }

  if (timeFilter == graphTimeFilter.DAY && dateValue != getDay()) {
    setDateValue(getDay());
  }

  if (typeFilter == graphFilter.INSULIN && yAxis != "insulin") {
    setYAxis("insulin");
    setMax(Math.max(...data.map((d) => d.insulin)));
    setMin(Math.min(...data.map((d) => d.insulin)));
  }

  if (
    (typeFilter == graphFilter.CARBS || typeFilter == graphFilter.ALL) &&
    yAxis != "carb"
  ) {
    setYAxis("carb");
    setMax(Math.max(...data.map((d) => d.carb)));
    if (typeFilter != graphFilter.ALL) {
      setMin(Math.min(...data.map((d) => d.carb)));
    } else {
      setMin(Math.min(...data.map((d) => d.insulin)));
    }
  }

  if (typeFilter == graphFilter.BLOOD_SUGAR && yAxis != "glucose") {
    setYAxis("glucose");
    setMax(Math.max(...data.map((d) => d.glucose)));
    setMin(Math.min(...data.map((d) => d.glucose)));
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get(
            `${import.meta.env.VITE_URL}/log/filter/${timeFilter}/${dateValue}`
          )
          .then((res) => {
            console.log(res.data);
            setData(res.data);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [timeFilter, dateValue]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ right: 50, top: 50 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis dataKey={yAxis} domain={[min!, max!]} />

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
