import { Log } from "../utils/util";

interface Props {
  toggle: boolean;
  log: Log;
}

const LogDropDown = ({ toggle, log }: Props) => {
  return (
    <div
      className={
        toggle ? "transition-all duration-300 h-[70%] max-h-[70%]" : "max-h-0"
      }
    >
      <ul>
        <li>Note: </li>
        <li>{log.note}</li>
        <li className="flex space-x-2 py-2">
          <button>Delete</button>
          <button>Edit</button>
        </li>
      </ul>
    </div>
  );
};

export default LogDropDown;
