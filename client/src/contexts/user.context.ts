import { createContext } from "react";
import { UnitType } from "../utils/util";

interface User {
  token: string,
  unit: UnitType
  email:string
}

interface UserContextType {
  authUser: User | null
  setAuthUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextType>({
  authUser: null,
  setAuthUser: () => {}
});


