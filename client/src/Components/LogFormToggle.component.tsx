import { IoMdClose } from "react-icons/io";
import LogFormCreate from "./LogFormCreate.component";

interface Props {
  toggle: boolean;
  setToggle: (status: boolean) => void;
}

const LogFormToggle = ({ toggle, setToggle }: Props) => {
  return (
    <div
      className={
        toggle
          ? "bg-gradient-to-t from-customblue-600 to-customblue-800 flex absolute inset-x-0 bottom-0 w-full h-[70%] max-h-[70%] lg:w-[30vw] lg:h-[65vh] lg:mx-auto items-center border-b-customblue-500 rounded-t-2xl border-t-2 transition-all duration-300 border-blue-200"
          : "max-h-0"
      }
    >
      <div className={toggle ? "flex flex-col w-full  h-full p-4" : "hidden"}>
        <div className="flex flex-col w-full items-end">
          <button onClick={() => setToggle(false)}>
            <IoMdClose />
          </button>
        </div>
        <div className="flex flex-col w-full p-4">
          <LogFormCreate
            setToggle={() => {
              setToggle(!toggle);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LogFormToggle;
