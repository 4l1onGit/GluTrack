import { useContext } from "react";
import { MessagesContext } from "../contexts/message.context";
import { MessageType } from "../utils/util";
import { FaSmile } from "react-icons/fa";
import { FaFaceAngry, FaFaceSurprise } from "react-icons/fa6";

const MessageModal = () => {
  const { messages, setMessages } = useContext(MessagesContext);
  return (
    <dialog id="msg_modal" className="modal" onClose={() => setMessages(null)}>
      <div className="modal-box space-y-2">
        <h3
          className={`font-bold text-2xl  ${
            messages != null
              ? messages![0].error == MessageType.ERROR
                ? "text-red-400"
                : messages![0].error == MessageType.SUCCESS
                ? "text-green-400"
                : "text-yellow-400"
              : null
          }`}
        >
          {messages != null ? (
            messages![0].error == MessageType.ERROR ? (
              <span className="flex space-x-2 items-center justify">
                <p>Error!</p>
                <span className="text-red-300">
                  <FaFaceAngry />
                </span>
              </span>
            ) : messages![0].error == MessageType.SUCCESS ? (
              <span className="flex space-x-2 items-center justify">
                <p>Success!</p>
                <span className="text-yellow-300">
                  <FaSmile />
                </span>
              </span>
            ) : (
              <span className="flex space-x-2 items-center justify">
                <p>Warning!</p>
                <span className="text-yellow-300">
                  <FaFaceSurprise />
                </span>
              </span>
            )
          ) : null}
        </h3>
        <ul className="flex flex-col">
          {messages?.map((e) => (
            <li
              key={e.message}
              className={`${
                messages![0].error == MessageType.ERROR
                  ? "text-red-400"
                  : messages![0].error == MessageType.SUCCESS
                  ? "text-green-400"
                  : "text-yellow-400"
              }`}
            >
              {e.message}
            </li>
          ))}
        </ul>
        <p className="py-4 text-xs">
          Press ESC key or click the button below to close
        </p>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default MessageModal;
