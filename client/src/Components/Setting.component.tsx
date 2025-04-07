import { useContext, useState } from "react";
// import { FaLock, FaLockOpen } from "react-icons/fa";
import { updateUserUnit } from "../api/userApi";
import { UserContext } from "../contexts/user.context";
import { glucoseUnit, MessageType } from "../utils/util";
import Slide from "./Slide.component";
import { MessagesContext } from "../contexts/message.context";

interface Props {
  toggle: boolean;
  setToggle: (toggleSetting: boolean) => void;
}

const Setting = ({ toggle, setToggle }: Props) => {
  const { authUser, setAuthUser } = useContext(UserContext);
  const { setMessages } = useContext(MessagesContext);

  // const [editLock, setEditLock] = useState({
  //   email: false,
  //   password: false,
  // });

  const [unit, setUnit] = useState<glucoseUnit>(
    authUser?.unit.id == 1 ? glucoseUnit.mmol : glucoseUnit.mg
  );

  // const [userDetails, setUserDetails] = useState({
  //   email: authUser?.email,
  //   password: "",
  // });

  const handleUnitChange = async () => {
    if (unit !== authUser?.unit.id) {
      const res = await updateUserUnit(unit);
      setAuthUser({ ...authUser!, unit: res.unit });
      setMessages([
        {
          message: "Unit set to: " + res.unit.unit_type,
          error: MessageType.SUCCESS,
        },
      ]);
    } else {
      setMessages([
        {
          message: "Unit already set to: " + authUser.unit.unit_type,
          error: MessageType.WARNING,
        },
      ]);
    }
    const modal = document.getElementById("msg_modal") as HTMLDialogElement;
    modal.showModal();
  };

  // const handleUserDetailsChange = () => {};

  return (
    <Slide setToggle={setToggle} toggle={toggle}>
      <div className="flex flex-col w-full space-y-3">
        <h2 className="text-2xl text-center font-semibold pb-2">Settings</h2>

        <div className="flex flex-col justify-evenly space-y-6 items-center h-full bg-base-100 border-1 border-base-300 rounded-2xl p-10 w-full">
          <h3 className="text-center text-xl font-semibold ">
            Blood Glucose Unit
          </h3>
          <select
            defaultValue={authUser?.unit.id}
            className="select select-primary bg-base-200"
            onChange={(e) => setUnit(parseInt(e.target.value))}
          >
            <option disabled={true}>
              Current:{" "}
              {authUser?.unit.id == glucoseUnit.mg ? "mg/dl" : "mmol/L"}
            </option>
            <option value={glucoseUnit.mmol}>mmol/L</option>
            <option value={glucoseUnit.mg}>mg/dl</option>
          </select>

          <div className="flex flex-col justify-center h-8 w-full space-y-2 items-center">
            <button
              className="btn btn-primary p-2 font-semibold w-full"
              onClick={handleUnitChange}
            >
              Confirm
            </button>
          </div>
        </div>

        {/* <div className="flex flex-col space-y-4 bg-base-100 border-1 border-base-300 rounded-2xl p-10">
          <h3 className="text-xl font-semibold text-center">User Settings</h3>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col justify-center space-y-2">
              <label className="">Email:</label>
              <div className="flex justify-end">
                <input
                  type="text"
                  className="input input-primary rounded-2xl h-10 absolute px-4 bg-base-200"
                  value={userDetails.email}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, email: e.target.value })
                  }
                  disabled={!editLock.email}
                />
                <button
                  className="relative rounded-r-2xl bg-primary h-10 px-3"
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
                  className="input input-primary rounded-2xl h-10 absolute px-4 bg-base-200"
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
                  className="relative rounded-r-2xl bg-primary h-10 px-3 "
                  onClick={() =>
                    setEditLock({ ...editLock, password: !editLock.password })
                  }
                >
                  {editLock.password ? <FaLockOpen /> : <FaLock />}
                </button>
              </div>
              <button className="btn btn-primary active:scale-95 shadow-lg active:shadow-md transition-all ease-linear active:bg-blue-900 duration-150 rounded-2xl p-2 font-semibold tracking-wide">
                Confirm
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </Slide>
  );
};

export default Setting;
