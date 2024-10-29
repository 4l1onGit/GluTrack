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

const data = [
  {
    name: "26/10",
    bg: 40,
    c: 24,
    in: 2,
  },
  {
    name: "27/10",
    bg: 30,
    c: 45,
    in: 3,
  },
  {
    name: "28/10",
    bg: 20,
    c: 90,
    in: 17,
  },
  {
    name: "29/10",
    bg: 27,
    c: 39,
    in: 8,
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

const LineChartComponent = () => {
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
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="c" stroke="#92ffad" />
        <Line type="monotone" dataKey="bg" stroke="#ffbc3f" />
        <Line type="monotone" dataKey="in" stroke="#fffd6d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
