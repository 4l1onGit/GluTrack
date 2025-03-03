import { useState } from "react";
import { FaLock, FaLockOpen } from "react-icons/fa";
import Slide from "./Slide.component";

interface Props {
  toggle: boolean;
  setToggle: (toggleSetting: boolean) => void;
}

const Setting = ({ toggle, setToggle }: Props) => {
  const [editLock, setEditLock] = useState({
    email: false,
    password: false,
  });

  return (
    <Slide setToggle={setToggle} toggle={toggle}>
      <div className="flex flex-col w-full space-y-5">
        <h2 className="text-2xl text-center font-semibold text-blue-950">
          Settings
        </h2>
        <h3 className="text-center text-xl font-semibold text-blue-950">
          Units
        </h3>
        <div className="flex justify-evenly items-center h-full bg-gradient-to-b from-customblue-700 to-customblue-900 rounded-2xl p-10 w-full">
          <div className="flex flex-col justify-center h-8 w-full space-y-2">
            <label htmlFor="">Insulin:</label>
            <select className="rounded-xl w-[50%] text-center h-full">
              <option>Unit</option>
            </select>
          </div>
          <div className="flex flex-col justify-center h-8 w-full space-y-2">
            <label htmlFor="">Glucose:</label>
            <select className="rounded-xl w-[50%] text-center h-full">
              <option>Unit</option>
            </select>
          </div>
        </div>
        <h3 className="text-xl font-semibold text-blue-950 text-center">
          User Settings
        </h3>
        <div className="flex flex-col space-y-4 bg-gradient-to-b from-customblue-700 to-customblue-900 rounded-2xl p-10">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col justify-center space-y-2">
              <label className="">Email:</label>
              <div className="flex justify-end">
                <input
                  type="text"
                  className="rounded-2xl h-10 w-80 absolute px-4"
                  value={"test@mail.com"}
                  disabled={!editLock.email}
                />
                <button
                  className="relative rounded-r-2xl bg-blue-950 h-10 px-3 text-customblue-500"
                  onClick={() =>
                    setEditLock({ ...editLock, email: !editLock.email })
                  }
                >
                  {editLock.email ? <FaLockOpen /> : <FaLock />}
                </button>
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-2">
              <label className="">Password:</label>
              <div className="flex justify-end">
                <input
                  type="password"
                  className="rounded-2xl h-10 w-80 absolute px-4"
                  value={"test@mail.com"}
                  disabled={!editLock.password}
                />
                <button
                  className="relative rounded-r-2xl bg-blue-950 h-10 px-3 text-customblue-500"
                  onClick={() =>
                    setEditLock({ ...editLock, password: !editLock.password })
                  }
                >
                  {editLock.password ? <FaLockOpen /> : <FaLock />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default Setting;
