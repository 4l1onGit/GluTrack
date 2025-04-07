import { useContext, useState } from "react";
import { MdDelete, MdEditSquare } from "react-icons/md";
import { deleteLog } from "../api/logApi";
import { Log, MessageType } from "../utils/util";
import LogFormEdit from "./LogFormEdit.component";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MessagesContext } from "../contexts/message.context";
import ImageView from "./ImageView.component";

interface Props {
  log: Log;
}

const LogDropDown = ({ log }: Props) => {
  const { setMessages } = useContext(MessagesContext);

  const [toggle, setToggle] = useState(false);
  const [imgToggle, setImgToggle] = useState(false);
  const queryClient = useQueryClient();

  const handleDelete = () => {
    mutateAsync(log.id!)
      .then(() => {
        setMessages([
          { message: "Succesfully Deleted Log ", error: MessageType.SUCCESS },
        ]);
      })
      .catch((e) =>
        setMessages([
          { message: "An Error Occured: " + e, error: MessageType.ERROR },
        ])
      );

    const modal = document.getElementById("msg_modal") as HTMLDialogElement;
    modal.showModal();
  };

  const { mutateAsync, isSuccess } = useMutation({
    mutationFn: deleteLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logsPaged"] });
    },
  });

  return (
    <div className="py-2">
      <ul>
        {log.note != "" ? (
          <>
            <li>Note: </li>
            <li className="text-sm py-2">{log.note}</li>
          </>
        ) : (
          ""
        )}
        {log.photo != "" ? (
          <li>
            <img
              onClick={() => setImgToggle(!imgToggle)}
              className="h-25 w-25 rounded-2xl"
              src={`${log.photo}`}
            />
          </li>
        ) : (
          ""
        )}
        <li className="flex space-x-2 py-6">
          <button
            className="flex text-2xl px-2 py-1 rounded-lg w-20 bg-red-400 justify-center items-center"
            onClick={() => handleDelete()}
          >
            {isSuccess ? "..." : <MdDelete />}
          </button>
          <button
            className="flex text-2xl px-2 py-1 rounded-lg w-20 bg-yellow-400 justify-center items-center"
            onClick={() => setToggle(!toggle)}
          >
            <MdEditSquare />
          </button>
        </li>
        <li>
          {toggle ? (
            <div
              className={`fixed inset-0 flex justify-center items-center transition-all ${
                toggle ? "visibile bg-black/20" : "invsible"
              }`}
            >
              <LogFormEdit setToggle={() => setToggle(!toggle)} log={log} />
            </div>
          ) : (
            ""
          )}
        </li>
        <li>
          {imgToggle ? (
            <div
              className={`fixed inset-0 flex justify-center items-center transition-all ${
                toggle ? "visibile bg-black/20" : "invsible"
              }`}
            >
              <ImageView
                setToggle={() => setImgToggle(!imgToggle)}
                image={log.photo}
              />
            </div>
          ) : (
            ""
          )}
        </li>
      </ul>
    </div>
  );
};

export default LogDropDown;
