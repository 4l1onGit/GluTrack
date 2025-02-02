const ListFilters = () => {
  return (
    <div className="flex bg-customblue-800 justify-center items-center w-full h-full rounded-xl shadow-md">
      <div className="flex justify-evenly space-x-2">
        <select className="h-10 rounded-2xl text-center px-2">
          <option>Day</option>
          <option>Week</option>
          <option>Month</option>
          <option>Year</option>
        </select>

        <input
          className="h-10 rounded-2xl text-center px-4"
          type="date"
          name="inputDate"
          id="inputDate"
        />
      </div>
    </div>
  );
};

export default ListFilters;
