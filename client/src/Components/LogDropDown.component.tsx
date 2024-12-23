import { Log } from "../utils/util";

interface Props {
  toggle: boolean;
  log: Log;
}

const LogDropDown = ({ toggle, log }: Props) => {
  return (
    <div className={toggle ? "" : "hidden"}>
      <ul>
        <li>{log.note}</li>
      </ul>
    </div>
  );
};

export default LogDropDown;
