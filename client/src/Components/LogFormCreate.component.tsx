import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { FormEvent, useContext, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { addLog } from "../api/logApi";
import { UserContext } from "../contexts/user.context";
import { mgToMmol } from "../utils/bgConversion";
import {
  createDate,
  glucoseUnit,
  Log,
  MessageType,
  modifyDate,
} from "../utils/util";
import Slide from "./Slide.component";
import { MessagesContext } from "../contexts/message.context";
import { uploadImage } from "../api/imageApi";

const initialState = {
  glucose: 0,
  carb: 0,
  date: "",
  insulin: 0,
  note: "",
  photo: "",
};

interface Props {
  toggle: boolean;
  setState: (status: boolean) => void;
}

const LogFormCreate = ({ toggle, setState }: Props) => {
  const queryClient = useQueryClient();
  const { authUser } = useContext(UserContext);
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
  const [glucose, setGlucose] = useState(0);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { setMessages } = useContext(MessagesContext);

  const { mutateAsync } = useMutation({
    mutationFn: addLog,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["logsPaged"],
      });
      queryClient.invalidateQueries({
        queryKey: ["logsGraphFilter"],
      });
    },
  });

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData!,
      date: modifyDate(e.target.value),
    });
    setDateInput(e.target.value);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files;
    if (image) {
      const res = await uploadImage(image![0]);
      setFormData({
        ...formData!,
        photo: res.image_url,
      });
      setMessages([
        {
          message: "Image uploaded",
          error: MessageType.SUCCESS,
        },
      ]);
      const modal = document.getElementById("msg_modal") as HTMLDialogElement;
      modal.showModal();
    }
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

  const handleSubmission = async (e: FormEvent) => {
    e.preventDefault();

    if (formData?.date == "" || formData?.date.length != 14) {
      setFormData({ ...formData!, date: createDate() });
    }

    if (navigator.onLine) {
      try {
        const res = await mutateAsync(formData);
        if (res.status == 200) {
          setState(false);
          setMessages([
            {
              message: "Successfully created log!",
              error: MessageType.SUCCESS,
            },
          ]);
          const modal = document.getElementById(
            "msg_modal"
          ) as HTMLDialogElement;
          modal.showModal();
        }
        setFormData({ ...initialState, id: undefined });
        setGlucose(0);
      } catch (e) {
        console.log(e);
        setMessages([
          {
            message: "Error Invalid Data",
            error: MessageType.ERROR,
          },
        ]);
        const modal = document.getElementById("msg_modal") as HTMLDialogElement;
        modal.showModal();
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
        setState(false);
      } catch (err) {
        console.log(err);
        setSubmitting(false);
        setState(false);
      }
    }
  };

  return (
    <Slide toggle={toggle} setToggle={setState}>
      <form className="w-full space-y-4" action="post">
        <div className="flex space-x-4 pb-4">
          <div className="flex flex-col justify-end items-end w-28">
            <label
              className="self-start uppercase text-xs font-bold pb-2"
              htmlFor="inputGlucose"
            >
              Glucose
            </label>

            <input
              className="h-10 absolute rounded-2xl px-4 w-28 input input-primary bg-base-100"
              type="number"
              name="inputGlucose"
              value={glucose}
              onChange={(e) => handleGlucoseChange(e)}
              id="inputGlucose"
            />
            <span className="relative h-10 w-14 rounded-r-2xl bg-primary py-2 text-center font-semibold">
              {authUser?.unit.id == 1 ? "mmol" : "mg"}
            </span>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="uppercase text-xs font-bold" htmlFor="inputTime">
              Time
            </label>
            <input
              className="h-10 rounded-2xl w-full text-center px-4 input input-primary bg-base-100"
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
              className="h-10 rounded-2xl px-4 w-28 bg-base-100 input input-primary"
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
              className="h-10 rounded-2xl px-4 w-28 bg-base-100 input input-primary"
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
            <label className="uppercase text-xs font-bold" htmlFor="image">
              Photo <span className="font-thin text-xs">(optional)</span>
            </label>
            <label htmlFor="image">
              <input
                id="image"
                name="image"
                type="file"
                onChange={(e) => handleImageUpload(e)}
                className="hidden"
              />
              <span className="btn btn-primary rounded-2xl w-full h-10 text-2xl">
                <FaCamera />
              </span>
            </label>
          </div>
        </div>
        <div className="flex flex-col py-2 space-y-2">
          <label className="uppercase text-xs font-bold" htmlFor="inputNotes">
            Notes <span className="font-thin text-xs">(optional)</span>
          </label>
          <textarea
            name="inputNotes"
            id="inputNotes"
            className="w-full h-[40vh] rounded-xl p-2 bg-base-100"
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
            className={`flex items-center rounded-2xl h-10 w-20 px-4 font-bold justify-center bg-primary`}
            onClick={(e) => handleSubmission(e)}
          >
            {submitting ? (
              <span className="loading loading-dots loading-sm"></span>
            ) : (
              "Log"
            )}
          </button>
        </div>
      </form>
    </Slide>
  );
};

export default LogFormCreate;
