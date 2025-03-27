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
          ? "bg-base-200 flex flex-col overflow-hidden  items-start absolute inset-x-0 bottom-0 w-full lg:w-[40vw] lg:mx-auto h-[70%] overflow-y-scroll max-h-[70%]  rounded-t-3xl transition-all duration-300"
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
