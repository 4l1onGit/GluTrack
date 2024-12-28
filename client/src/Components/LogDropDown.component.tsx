import { useEffect } from "react";
import { Log } from "../utils/util";
import axios from "axios";

interface Props {
  log: Log;
}

const LogDropDown = ({ log }: Props) => {
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
          <button>Edit</button>
        </li>
      </ul>
    </div>
  );
};

export default LogDropDown;
