import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Props } from "recharts/types/container/Surface";

enum graphFilter {
  BLOOD_SUGAR = "sugar",
  CARBS = "carbs",
  INSULIN = "insulin",
  ALL = "all",
}

const data = [
  {
    name: "26/10",
    bg: 6,
    c: 24,
    in: 2,
  },
  {
    name: "27/10",
    bg: 9,
    c: 45,
    in: 4,
  },
  {
    name: "28/10",
    bg: 4,
    c: 90,
    in: 5,
  },
  {
    name: "29/10",
    bg: 13,
    c: 39,
    in: 7,
  },
  // {
  //   name: "Page E",
  //   bg: 18,
  //   c: 48,
  //   in: 7,
  // },
  // {
  //   name: "Page F",
  //   bg: 23,
  //   c: 38,
  //   in: 14,
  // },
  // {
  //   name: "Page G",
  //   bg: 34,
  //   c: 43,
  //   in: 11,
  // },
];

interface Props {
  filter: graphFilter;
}

const LineChartComponent = ({ filter }: Props) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        className="w-full h-full"
        data={data}
        margin={{ right: 50, top: 50 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />

        <Legend />
        {filter === graphFilter.CARBS || filter === graphFilter.ALL ? (
          <Line type="monotone" dataKey="c" stroke="#92ffad" strokeWidth={3} />
        ) : null}
        {filter === graphFilter.BLOOD_SUGAR || filter === graphFilter.ALL ? (
          <Line type="monotone" dataKey="bg" stroke="#ffbc3f" strokeWidth={3} />
        ) : null}
        {filter === graphFilter.INSULIN || filter === graphFilter.ALL ? (
          <Line type="monotone" dataKey="in" stroke="#fffd6d" strokeWidth={3} />
        ) : null}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
