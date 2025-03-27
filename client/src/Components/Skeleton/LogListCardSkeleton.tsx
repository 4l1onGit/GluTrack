const LogListCardSkeleton = () => {
  return (
    <li className="skeleton h-28 w-full rounded-2xl flex">
      <div className="py-4 w-full space-y-4 px-4 flex flex-col items-center justify-center">
        <div className="skeleton h-2 w-full"></div>
        <div className="skeleton h-2 w-full"></div>
        <div className="skeleton h-2 w-full"></div>
        <div className="skeleton h-2 w-full"></div>
      </div>
    </li>
  );
};

export default LogListCardSkeleton;
