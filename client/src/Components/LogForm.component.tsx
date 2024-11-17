import { IoMdClose } from "react-icons/io";

interface Props {
  toggle: boolean;
  setState: () => {};
}

const LogForm = ({ toggle, setState }: Props) => {
  return (
    <div
      className={
        toggle
          ? "bg-customblue-500 flex absolute inset-x-0 bottom-0 w-full h-[65%]  items-center border-b-customblue-600 rounded-2xl border-t-2 border-blue-200"
          : "hidden"
      }
    >
      <div className="flex flex-col w-full  h-full p-4">
        <div className="flex flex-col w-full items-end">
          <button onClick={() => setState()}>
            <IoMdClose />
          </button>
        </div>
        <div className="flex flex-col w-full p-4">
          <form action="post">
            <div className="flex space-x-4  pb-4">
              <div className="flex flex-col space-y-2 w-28">
                <label htmlFor="inputGlucose">Glucose</label>
                <input
                  className="h-10 rounded-2xl px-4"
                  type="number"
                  name="inputGlucose"
                  id="inputGlucose"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="inputTime">
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
                <label htmlFor="inputCarbs">Carbohydrates</label>
                <input
                  className="h-10 rounded-2xl px-4 w-28"
                  type="number"
                  name="inputCarbs"
                  id="inputCarbs"
                />
              </div>
              <div className="flex flex-col space-y-2 relative">
                <label htmlFor="inputInsulin">Insulin</label>
                <input
                  className="h-10 rounded-2xl w-28 px-4"
                  type="number"
                  name="inputInsulin"
                  id="inputInsulin"
                />
              </div>
            </div>
            <div className="flex flex-col py-2 h-full space-y-2">
              <label htmlFor="inputNotes">
                Notes <span className="font-thin text-xs">(optional)</span>
              </label>
              <textarea
                name="inputNotes"
                id="inputNotes"
                className="w-full h-[80%] rounded-xl"
              />
            </div>
            <div className="flex justify-end">
              <button className="bg-[#FFDFBF] rounded-2xl h-10 w-20 px-4">
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
