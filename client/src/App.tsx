const graphToggles = [
  { label: "Sugar", style: "hover:bg-orange-200", action: () => {} },
  { label: "Carbs", style: "hover:bg-green-200", action: () => {} },
  { label: "Insulin", style: "hover:bg-yellow-200", action: () => {} },
  { label: "All", style: "hover:bg-purple-200", action: () => {} },
];

const logActions = [
  {
    label: "Log Insulin",
    action: () => {},
  },
  {
    label: "Log Mood",
    action: () => {},
  },
];

function App() {
  return (
    <div className="flex flex-col p-4 pt-8 h-full items-center justify-center space-y-6 w-[95%] mx-auto">
      <div className="bg-customblue-500 rounded-xl w-full h-[16rem] hover:bg-customblue-600 transition-colors duration-150 ease-in-out"></div>
      <div className="flex space-x-4 w-full">
        {graphToggles.map((item) => (
          <button
            className={`bg-customblue-500 w-[5rem] h-[3rem] rounded-xl font-bold text-sm text-blue-950 ${item.style}`}
            key={item.label}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="flex space-x-4 w-full">
        {logActions.map((action) => (
          <button
            onClick={action.action}
            key={action.label}
            className="bg-customblue-500 w-[11rem] h-[8rem] rounded-xl hover:bg-customblue-600 transition-colors duration-150 ease-in-out font-bold text-blue-950"
          >
            {action.label}
          </button>
        ))}
      </div>
      <div className="bg-customblue-500 w-full h-[13rem] rounded-xl hover:bg-customblue-600 transition-colors duration-150 ease-in-out"></div>
    </div>
  );
}

export default App;
