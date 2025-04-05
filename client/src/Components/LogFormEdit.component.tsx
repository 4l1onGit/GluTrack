import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { updateLog } from "../api/logApi";
import { UserContext } from "../contexts/user.context";
import { mgToMmol, mmolToMg } from "../utils/bgConversion";
import {
  convertDateDefault,
  createDate,
  glucoseUnit,
  Log,
  MessageType,
  modifyDate,
} from "../utils/util";
import { MessagesContext } from "../contexts/message.context";

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

  log: Log;
}

const LogFormEdit = ({ setToggle, log }: Props) => {
  const [dateInput, setDateInput] = useState("");
  const [formData, setFormData] = useState<Log>(log);

  const { authUser } = useContext(UserContext);
  const { setMessages } = useContext(MessagesContext);

  const [glucose, setGlucose] = useState(
    authUser?.unit.id == glucoseUnit.mg ? mmolToMg(log.glucose) : log.glucose
  );
  const [submitting, setSubmitting] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: updateLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logsPaged"] });
    },
  });

  useEffect(() => {
    if (log.date) {
      setDateIfExists(log.date);
    }
  }, [log]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData!,
      date: modifyDate(e.target.value),
    });
    setDateInput(e.target.value);
  };

  const handleGlucoseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGlucose(e.target.valueAsNumber);
    setFormData({
      ...formData!,
      glucose:
        authUser?.unit.id == glucoseUnit.mg
          ? mgToMmol(e.target.valueAsNumber)
          : e.target.valueAsNumber,
    });
  };

  const setDateIfExists = (date: string) => {
    setDateInput(convertDateDefault(date));
  };

  const handleSubmission = async (e: FormEvent) => {
    e.preventDefault();

    if (formData?.date == "" || formData?.date.length != 14) {
      setFormData({ ...formData!, date: createDate() });
    }

    setSubmitting(true);
    await mutateAsync(formData!)
      .then(() => {
        setToggle(false);
        setFormData({ ...initialState, id: undefined });
        setGlucose(0);
        setSubmitting(false);
        setMessages([
          { message: "Successfully Edited Log!", error: MessageType.SUCCESS },
        ]);
        const modal = document.getElementById("msg_modal") as HTMLDialogElement;
        modal.showModal();
      })
      .catch((e) => {
        console.log(e);
        setSubmitting(false);
      });
  };

  return (
    <form
      className="space-y-2 bg-base-200 shadow-md w-[95vw] transition-all p-4 rounded-2xl h-[70vh]"
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
            className="h-10 rounded-2xl px-4 bg-base-100"
            type="number"
            name="inputGlucose"
            value={glucose}
            onChange={(e) => handleGlucoseChange(e)}
            id="inputGlucose"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="uppercase text-xs font-bold" htmlFor="inputTime">
            Time <span className="font-thin text-xs">(optional)</span>
          </label>
          <input
            className="h-10 rounded-2xl w-full text-center px-2 bg-base-100"
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
            className="h-10 rounded-2xl px-4 w-28 bg-base-100"
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
            className="h-10 rounded-2xl w-28 px-4 bg-base-100"
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
            className="bg-primary rounded-2xl w-full h-10"
          >
            <FaCamera className="mx-auto" />
          </button>
        </div>
      </div>
      <div className="flex flex-col py-2 h-full space-y-4">
        <label className="uppercase text-xs font-bold" htmlFor="inputNotes">
          Notes <span className="font-thin text-xs">(optional)</span>
        </label>
        <textarea
          name="inputNotes"
          id="inputNotes"
          className="w-full h-[20vh] rounded-xl p-2 bg-base-100"
          value={formData?.note}
          onChange={(e) =>
            setFormData({
              ...formData!,
              note: e.target.value,
            })
          }
        />
        <div className="w-full flex justify-end">
          <button
            disabled={submitting}
            className={`flex items-center rounded-2xl h-10 w-20 px-4 font-bold justify-center ${
              submitting ? "bg-[#fa9836]" : "bg-primary"
            }`}
            onClick={(e) => handleSubmission(e)}
          >
            {submitting ? (
              <span className="loading loading-dots loading-sm"></span>
            ) : (
              "Edit"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default LogFormEdit;
