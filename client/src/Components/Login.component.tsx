import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { loginUser, registerUser } from "../api/userApi";
import App from "../App";

type User = {
  username: string;
  password: string;
};

const Login = () => {
  const [user, setUser] = useState<User>({
    username: "",
    password: "",
  });

  const [registerToggle, setRegisterToggle] = useState<boolean>(false);

  const [auth, setAuth] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const { mutateAsync: authMutation } = useMutation({
    mutationFn: registerToggle ? registerUser : loginUser,
  });

  const handleLogin = async () => {
    try {
      const token = (await authMutation(user)).token;
      if (token != null) {
        sessionStorage.setItem("jwt", token);
        setAuth(true);
        setUser({
          username: "",
          password: "",
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  if (auth) {
    return <App />;
  } else {
    return (
      <div className="flex flex-col justify-center p-4 items-center h-[100vh]">
        <div className="flex flex-col bg-gradient-to-b from-customblue-700 to-customblue-900 px-20 h-[40vh] items-center justify-center space-y-4 rounded-xl">
          <button
            onClick={() => setRegisterToggle(!registerToggle)}
            className=" px-4 py-1 w-24 text-center"
          >
            {registerToggle ? "Login?" : "Register?"}
          </button>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-bold" htmlFor="userInput">
              Email
            </label>
            <input
              className="h-8 rounded-xl px-2"
              name="username"
              id="userInput"
              type="email"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-bold" htmlFor="passwordInput">
              Password
            </label>
            <input
              className="h-8 rounded-xl px-2"
              name="password"
              id="passwordInput"
              type="password"
              onChange={handleChange}
            />
          </div>
          <button
            className="bg-white px-5 rounded-xl py-1 font-semibold"
            onClick={handleLogin}
          >
            {registerToggle ? "Register" : "Login"}
          </button>
        </div>
      </div>
    );
  }
};

export default Login;
