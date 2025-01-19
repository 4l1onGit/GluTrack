import { useState } from "react";
import { MdDelete, MdEditSquare } from "react-icons/md";
import { deleteLog } from "../api/logApi";
import { Log } from "../utils/util";
import LogFormEdit from "./LogFormEdit.component";

interface Props {
  log: Log;
}

const LogDropDown = ({ log }: Props) => {
  const [toggle, setToggle] = useState(false);

  const handleDelete = () => {
    deleteLog(log.id!).catch((e) => console.log(e));
  };

  return (
    <div className="py-2">
      <ul>
        <li>Note: </li>
        <li className="text-sm py-2">{log.note}</li>
        <li className="flex space-x-2 py-6">
          <button
            className="flex text-2xl px-2 py-1 rounded-lg w-20 bg-red-400 justify-center items-center"
            onClick={() => handleDelete()}
          >
            <MdDelete />
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
              <LogFormEdit setToggle={() => setToggle(!toggle)} id={log.id!} />
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
