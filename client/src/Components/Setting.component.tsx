import { useContext, useState } from "react";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { updateUserUnit } from "../api/userApi";
import { UserContext } from "../contexts/user.context";
import { glucoseUnit } from "../utils/util";
import Slide from "./Slide.component";

interface Props {
  toggle: boolean;
  setToggle: (toggleSetting: boolean) => void;
}

const Setting = ({ toggle, setToggle }: Props) => {
  const { authUser, setAuthUser } = useContext(UserContext);

  const [editLock, setEditLock] = useState({
    email: false,
    password: false,
  });

  const [unit, setUnit] = useState<glucoseUnit>(
    authUser?.unit.id == 1 ? glucoseUnit.mmol : glucoseUnit.mg
  );

  const [userDetails, setUserDetails] = useState({
    email: authUser?.email,
    password: "",
  });

  const handleUnitChange = async () => {
    const res = await updateUserUnit(unit);
    setAuthUser({ ...authUser!, unit: res.unit });
  };

  // const handleUserDetailsChange = () => {};

  return (
    <Slide setToggle={setToggle} toggle={toggle}>
      <div className="flex flex-col w-full space-y-3">
        <h2 className="text-2xl text-center font-semibold text-blue-950">
          Settings
        </h2>
        <h3 className="text-center text-xl font-semibold text-blue-950">
          Units
        </h3>
        <div className="flex justify-evenly items-center h-full bg-gradient-to-b from-customblue-700 to-customblue-900 rounded-2xl p-10 w-full">
          <div className="flex flex-col justify-center h-full w-full space-y-2">
            <label htmlFor="">Glucose:</label>
            <select
              className="rounded-xl w-[50%] text-center h-full items-center"
              defaultValue={authUser?.unit.id}
              onChange={(e) => setUnit(parseInt(e.target.value))}
            >
              <option value={glucoseUnit.mmol}>mmol/L</option>
              <option value={glucoseUnit.mg}>mg/dl</option>
            </select>
          </div>
          <div className="flex flex-col justify-center h-8 w-full space-y-2 items-center">
            <button
              className="bg-blue-950 rounded-3xl p-2 text-white font-semibold"
              onClick={handleUnitChange}
            >
              Confirm
            </button>
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
                  value={userDetails.email}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, email: e.target.value })
                  }
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
            <div className="flex flex-col justify-center space-y-4">
              <label className="">Password:</label>
              <div className="flex justify-end">
                <input
                  type="password"
                  className="rounded-2xl h-10 w-80 absolute px-4"
                  value={userDetails.password}
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      password: e.target.value,
                    })
                  }
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
              <button className="bg-blue-950 active:scale-95 shadow-lg active:shadow-md transition-all ease-linear active:bg-blue-900 duration-150 rounded-2xl p-2 text-white font-semibold tracking-wide">
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default Setting;
