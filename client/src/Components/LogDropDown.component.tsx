import axios from "axios";
import { useState } from "react";
import { Log } from "../utils/util";
import LogFormEdit from "./LogFormEdit.component";

interface Props {
  log: Log;
}

const LogDropDown = ({ log }: Props) => {
  const [toggle, setToggle] = useState(false);

  const handleDelete = () => {
    axios
      .delete(`${import.meta.env.VITE_URL}/log/delete/${log.id}`)
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div className="py-1">
      <ul>
        <li>Note: </li>
        <li>{log.note}</li>
        <li className="flex space-x-2 py-2">
          <button onClick={() => handleDelete()}>Delete</button>
          <button onClick={() => setToggle(!toggle)}>Edit</button>
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
