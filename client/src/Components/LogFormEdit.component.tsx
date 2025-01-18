import axios, { AxiosRequestConfig } from "axios";
import React, { FormEvent, useEffect, useState } from "react";
import { FaCamera, FaSpinner } from "react-icons/fa";
import { convertDateDefault, createDate, Log, modifyDate } from "../utils/util";
import { IoMdClose } from "react-icons/io";

const getAxiosConfig = (): AxiosRequestConfig => {
  const token = sessionStorage.getItem("jwt");
  return {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  };
};

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
  id: number;
}

const LogFormEdit = ({ setToggle, id }: Props) => {
  const [dateInput, setDateInput] = useState("");
  const [formData, setFormData] = useState<Log>();

  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData!,
      date: modifyDate(e.target.value),
    });
    setDateInput(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_URL}/api/log/${id}`, getAxiosConfig())
      .then((res) => {
        console.log(res.data);
        setFormData(res.data);
        if (res.data.date) {
          setDateIfExists(res.data.date);
        }
      });
  }, [id]);

  const setDateIfExists = (date: string) => {
    setDateInput(convertDateDefault(date));
  };

  const handleSubmission = (e: FormEvent) => {
    e.preventDefault();

    if (formData?.date == "" || formData?.date.length != 14) {
      setFormData({ ...formData!, date: createDate() });
    }

    try {
      setSubmitting(true);

      axios
        .patch(
          `${import.meta.env.VITE_URL}/api/log/${id}`,
          formData,
          getAxiosConfig()
        )
        .then((res) => {
          if (res.status == 200) {
            console.log(res);
            setToggle(false);
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
    <form
      className="space-y-2 text-black bg-customblue-600 shadow-md transition-all p-6 rounded-2xl"
      action="patch"
    >
      <div className="flex flex-col w-full items-end">
        <button onClick={() => setToggle(false)}>
          <IoMdClose />
        </button>
      </div>
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
          {submitting ? <FaSpinner /> : "Edit"}
        </button>
      </div>
    </form>
  );
};

export default LogFormEdit;
