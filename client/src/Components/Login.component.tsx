import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { loginUser, registerUser } from "../api/userApi";
import App from "../App";
import { MdAlternateEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";

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
        <div className="flex flex-col bg-gradient-to-b from-customblue-700 to-customblue-900 h-[55vh] items-center justify-center space-y-6 rounded-xl w-full md:w-[25vw] shadow-lg">
          <h2 className="text-3xl font-bold p-4 text-blue-950">
            {registerToggle ? "Register" : "Login"}
          </h2>
          <div className="flex flex-col space-y-2 w-full px-10">
            <label className="text-md px-2 font-bold" htmlFor="userInput">
              Email
            </label>
            <div className="flex items-center relative">
              <input
                className="h-12 rounded-3xl px-4 w-full"
                placeholder="Enter email"
                name="username"
                id="userInput"
                type="email"
                onChange={handleChange}
              />
              <span className="text-2xl absolute top-0 right-0 p-3 text-customblue-600">
                <MdAlternateEmail />
              </span>
            </div>
          </div>
          <div className="flex flex-col space-y-2 w-full px-10">
            <label className="text-md px-2 font-bold" htmlFor="passwordInput">
              Password
            </label>
            <div className="flex items-center relative">
              <input
                className="h-12 rounded-3xl px-4 w-full"
                name="password"
                placeholder="Enter password"
                id="passwordInput"
                type="password"
                onChange={handleChange}
              />
              <span className="text-2xl absolute top-0 right-0 p-3 text-customblue-600">
                <FaKey />
              </span>
            </div>

            <span className="text-sm self-end px-2 text-blue-950">
              reset password?
            </span>
          </div>
          <div className="flex flex-col w-full px-10 py-6">
            <button
              className="bg-white rounded-3xl py-1 font-semibold h-12"
              onClick={handleLogin}
            >
              {registerToggle ? "Register" : "Login"}
            </button>
            <div className="flex items-center justify-center py-4 space-x-2 font-semibold text-sm">
              <span>
                {registerToggle
                  ? "Already have an account?"
                  : "Don't have an account?"}
              </span>
              <button
                onClick={() => setRegisterToggle(!registerToggle)}
                className="text-center underline underline-offset-2 font-bold"
              >
                {registerToggle ? "Login" : "Register"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Login;
