import { ReactNode, useState } from "react";
import { UserContext } from "../contexts/user.context";

interface User {
  token: string;
  unit: string;
  email: string;
}

interface Props {
  children: ReactNode;
}

export const UserProvider = ({ children }: Props) => {
  const [authUser, setAuthUser] = useState<User | null>(null);

  const value = { authUser, setAuthUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
