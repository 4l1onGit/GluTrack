import axios from "axios";
import { FormEvent, useState } from "react";
import { FaCamera, FaSpinner } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Log } from "../utils/util";

interface Props {
  toggle: boolean;
  setState: (status: boolean) => void;
}

const initialState = {
  glucose: 0,
  carb: 0,
  date: "",
  insulin: 0,
  note: "",
  photo: "",
};

function createDate() {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const hour = date.getHours();
  const minutes = date.getMinutes();

  return `${day}-${month}-${year}-${hour}:${minutes}`;
}

function modifyDate(date: string) {
  const dateStamp = date.slice(0, 10);
  const year = dateStamp.slice(0, 4);
  const month = dateStamp.slice(5, 7);
  const day = dateStamp.slice(8, 10);
  const time = date.slice(11, 16);

  return `${day}-${month}-${year}-${time}`;
}

const LogForm = ({ toggle, setState }: Props) => {
  const [dateInput, setDateInput] = useState("");
  const [formData, setFormData] = useState<Log>({
    id: undefined,
    glucose: 0,
    carb: 0,
    date: Date.now().toString(),
    insulin: 0,
    note: "",
    photo: "",
  });
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData!,
      date: modifyDate(e.target.value),
    });
    setDateInput(e.target.value);
  };

  const handleSubmission = (e: FormEvent) => {
    e.preventDefault();

    if (formData?.date == "" || formData?.date.length != 14) {
      setFormData({ ...formData!, date: createDate() });
    }

    try {
      setSubmitting(true);

      axios
        .post(`${import.meta.env.VITE_URL}/log/create`, formData)
        .then((res) => {
          if (res.status == 200) {
            console.log(res);
            setState(false);
          }
          setFormData({ ...initialState, id: undefined });
          setSubmitting(false);
        })
        .catch((err) => {
          console.log(err);
          setSubmitting(false);
        });
    } catch (err) {
      console.log(err);
      setSubmitting(false);
    }
  };

  return (
    <div
      className={
        toggle
          ? "bg-gradient-to-t from-customblue-600 to-customblue-800 flex absolute inset-x-0 bottom-0 w-full h-[70%] max-h-[70%] items-center border-b-customblue-500 rounded-t-2xl border-t-2 transition-all duration-300 border-blue-200"
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
                  value={formData?.glucose}
                  onChange={(e) =>
                    setFormData({
                      ...formData!,
                      glucose: e.target.valueAsNumber,
                    })
                  }
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
                  value={dateInput}
                  onChange={(e) => handleDateChange(e)}
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
                  value={formData?.carb}
                  onChange={(e) =>
                    setFormData({
                      ...formData!,
                      carb: e.target.valueAsNumber,
                    })
                  }
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
                  value={formData?.insulin}
                  onChange={(e) =>
                    setFormData({
                      ...formData!,
                      insulin: e.target.valueAsNumber,
                    })
                  }
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
                value={formData?.note}
                onChange={(e) =>
                  setFormData({
                    ...formData!,
                    note: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex justify-end">
              <button
                disabled={submitting}
                className={`flex items-center rounded-2xl h-10 w-20 px-4 font-bold justify-center ${
                  submitting ? "bg-[#fa9836]" : "bg-[#FFDFBF]"
                }`}
                onClick={(e) => handleSubmission(e)}
              >
                {submitting ? <FaSpinner /> : "Log"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogForm;
