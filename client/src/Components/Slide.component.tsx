import React from "react";
import { IoMdClose } from "react-icons/io";

interface SlideProps {
  toggle: boolean;
  setToggle: (status: boolean) => void;
  children: React.ReactNode;
}

const Slide = ({ toggle, children, setToggle }: SlideProps) => {
  return (
    <div
      className={
        toggle
          ? "bg-customblue-500 flex flex-col overflow-hidden  items-start absolute inset-x-0 bottom-0 w-full lg:w-[40vw] lg:mx-auto h-[70%] overflow-y-scroll max-h-[70%] border-b-customblue-500 rounded-t-2xl border-t-2 transition-all duration-300 border-blue-200"
          : "max-h-0"
      }
    >
      <div
        className={
          toggle ? "flex flex-col w-full items-end p-4 space-y-4" : "hidden"
        }
      >
        <button onClick={() => setToggle(false)} className="text-xl">
          <IoMdClose />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Slide;
