import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  pages: number[];
  maxPage: number;
}

const Pagination = ({ page, setPage, pages, maxPage }: PaginationProps) => {
  return (
    <ul className="flex justify-center w-full items-center h-12 space-x-2 rounded-lg ">
      {page > 1 ? (
        <li className="flex items-center">
          <button
            className="text-blue-950 bg-white text-xl p-1 rounded-3xl "
            onClick={() => setPage(page - 1)}
          >
            <FaChevronLeft />
          </button>
        </li>
      ) : (
        ""
      )}

      {pages.map((_, index) => (
        <li key={index}>
          <button
            className={`px-3  rounded-3xl font-semibold text-xl text-blue-950 ${
              page == index + 1
                ? " bg-gradient-to-l from-customblue-800 to-customblue-900 text-white"
                : "bg-white"
            }`}
            onClick={() => {
              if (index + 1 <= maxPage) setPage(index + 1);
            }}
          >
            {index + 1}
          </button>
        </li>
      ))}
      {page < maxPage && pages.length > 1 ? (
        <li className="flex items-center">
          <button
            className="text-blue-950 bg-white text-xl p-1 rounded-3xl"
            onClick={() => setPage(page + 1)}
          >
            <FaChevronRight />
          </button>
        </li>
      ) : (
        ""
      )}
    </ul>
  );
};

export default Pagination;
