import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { FormEvent, useState } from "react";
import { FaCamera, FaSpinner } from "react-icons/fa";
import { addLog } from "../api/logApi";
import { createDate, Log, modifyDate } from "../utils/util";

const initialState = {
  glucose: 0,
  carb: 0,
  date: "",
  insulin: 0,
  note: "",
  photo: "",
};

interface Props {
  setToggle: (status: boolean) => void;
}

const LogFormCreate = ({ setToggle }: Props) => {
  const queryClient = useQueryClient();
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

  const { mutateAsync } = useMutation({
    mutationFn: addLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logsPaged", "logsTotal"] });
    },
  });

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData!,
      date: modifyDate(e.target.value),
    });
    setDateInput(e.target.value);
  };

  const handleSubmission = async (e: FormEvent) => {
    e.preventDefault();

    if (formData?.date == "" || formData?.date.length != 14) {
      setFormData({ ...formData!, date: createDate() });
    }

    if (navigator.onLine) {
      try {
        const res = await mutateAsync(formData);
        if (res.status == 200) {
          setToggle(false);
        }
        setFormData({ ...initialState, id: undefined });
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        if (localStorage.getItem("createLog")) {
          const logs = localStorage.getItem("createLog")?.split("+");
          logs?.push(JSON.stringify(formData));
          localStorage.setItem("createLog", logs!.join("+"));
        } else {
          localStorage.setItem("createLog", JSON.stringify(formData));
        }
        setSubmitting(false);
        setToggle(false);
      } catch (err) {
        console.log(err);
        setSubmitting(false);
        setToggle(false);
      }
    }
  };

  return (
    <form className="space-y-2" action="post">
      <div className="flex space-x-4  pb-4">
        <div className="flex flex-col space-y-2 w-28">
          <label className="uppercase text-xs font-bold" htmlFor="inputGlucose">
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
          <label className="uppercase text-xs font-bold" htmlFor="inputTime">
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
          <label className="uppercase text-xs font-bold" htmlFor="inputCarbs">
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
          <label className="uppercase text-xs font-bold" htmlFor="inputInsulin">
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
          <label className="uppercase text-xs font-bold" htmlFor="photoBtn">
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
        <label className="uppercase text-xs font-bold" htmlFor="inputNotes">
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
  );
};

export default LogFormCreate;
