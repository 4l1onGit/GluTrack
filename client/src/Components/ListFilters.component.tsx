import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { logFilters } from "../utils/util";

interface Props {
  setFilters: (filters: logFilters) => void;
  filters: logFilters;
}

enum Ranges {
  DAY = "day",
  WEEK = "week",
  MONTH = "month",
  YEAR = "year",
}

const ListFilters = ({ setFilters }: Props) => {
  const [range, setRange] = useState<string>(Ranges.YEAR);
  const [date, setDate] = useState<string>();

  useEffect(() => {
    if (date != undefined) {
      setFilters({
        year: date.substring(0, 4),
        month:
          range == Ranges.MONTH || range == Ranges.DAY || range == Ranges.WEEK
            ? date.substring(5, 7)
            : undefined,
        week: range == Ranges.WEEK ? true : undefined,
        day:
          range == Ranges.DAY || range == Ranges.WEEK
            ? date.substring(8, 10)
            : undefined,
      });
    }
  }, [range, date]);

  const clearFilters = () => {
    setFilters({});
    setRange(Ranges.YEAR);
    const selectRange = document.getElementById(
      "rangeSelectBox"
    ) as HTMLInputElement;

    selectRange.value = Ranges.YEAR;
    setDate("");
  };

  return (
    <div className="flex bg-base-100 justify-center items-center w-full h-full rounded-xl shadow-md">
      <div className="flex justify-evenly space-x-2">
        <select
          id="rangeSelectBox"
          defaultValue={Ranges.YEAR}
          onChange={(e) => setRange(e.target.value)}
          className="h-10 rounded-2xl select select-primary bg-base-200"
        >
          <option value={Ranges.YEAR}>Year</option>
          <option value={Ranges.MONTH}>Month</option>
          <option value={Ranges.WEEK}>Week</option>
          <option value={Ranges.DAY}>Day</option>
        </select>

        <input
          className="h-10 rounded-2xl text-center px-4 input input-primary bg-base-200"
          type="date"
          name="inputDate"
          id="inputDate"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={() => clearFilters()} className="btn btn-primary w-12">
          <ImCross />
        </button>
      </div>
    </div>
  );
};

export default ListFilters;
