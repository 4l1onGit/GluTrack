import { FaCamera } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

interface Props {
  toggle: boolean;
  setState: (status: boolean) => void;
}

const LogForm = ({ toggle, setState }: Props) => {
  return (
    <div
      className={
        toggle
          ? "bg-customblue-500 flex absolute inset-x-0 bottom-0 w-full h-[70%] max-h-[70%] items-center border-b-customblue-500 rounded-t-2xl border-t-2 transition-all duration-300 border-blue-200"
          : "max-h-0"
      }
    >
      <div className={toggle ? "flex flex-col w-full  h-full p-4" : "hidden"}>
        <div className="flex flex-col w-full items-end">
          <button onClick={() => setState(false)}>
            <IoMdClose />
          </button>
        </div>
        <div className="flex flex-col w-full p-4">
          <form className="space-y-2" action="post">
            <div className="flex space-x-4  pb-4">
              <div className="flex flex-col space-y-2 w-28">
                <label
                  className="uppercase text-xs font-bold"
                  htmlFor="inputGlucose"
                >
                  Glucose
                </label>
                <input
                  className="h-10 rounded-2xl px-4"
                  type="number"
                  name="inputGlucose"
                  id="inputGlucose"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label
                  className="uppercase text-xs font-bold"
                  htmlFor="inputTime"
                >
                  Time <span className="font-thin text-xs">(optional)</span>
                </label>
                <input
                  className="h-10 rounded-2xl w-full text-center px-4"
                  type="datetime-local"
                  name="inputTime"
                  id="inputTime"
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="flex flex-col space-y-2">
                <label
                  className="uppercase text-xs font-bold"
                  htmlFor="inputCarbs"
                >
                  Carbohydrates
                </label>
                <input
                  className="h-10 rounded-2xl px-4 w-28"
                  type="number"
                  name="inputCarbs"
                  id="inputCarbs"
                />
              </div>
              <div className="flex flex-col space-y-2 relative">
                <label
                  className="uppercase text-xs font-bold"
                  htmlFor="inputInsulin"
                >
                  Insulin
                </label>
                <input
                  className="h-10 rounded-2xl w-28 px-4"
                  type="number"
                  name="inputInsulin"
                  id="inputInsulin"
                />
              </div>

              <div className="flex flex-col space-y-2 relative justify-center w-full">
                <label
                  className="uppercase text-xs font-bold"
                  htmlFor="photoBtn"
                >
                  Photo
                </label>
                <button
                  id="photoBtn"
                  onSubmit={() => {}}
                  className="bg-white rounded-2xl w-full h-10"
                >
                  <FaCamera className="mx-auto" />
                </button>
              </div>
            </div>
            <div className="flex flex-col py-2 h-full space-y-2">
              <label
                className="uppercase text-xs font-bold"
                htmlFor="inputNotes"
              >
                Notes <span className="font-thin text-xs">(optional)</span>
              </label>
              <textarea
                name="inputNotes"
                id="inputNotes"
                className="w-full h-[80%] rounded-xl p-2"
              />
            </div>
            <div className="flex justify-end">
              <button className="bg-[#FFDFBF] rounded-2xl h-10 w-20 px-4 font-bold">
                Log
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogForm;
