import axios from "axios";
import { useEffect, useState } from "react";
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

  const [auth, setAuth] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    axios
      .post(`${import.meta.env.VITE_URL}/api/login`, user, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        const token = res.data.token;
        if (token != null) {
          sessionStorage.setItem("jwt", token);
          setAuth(true);
        }
      })
      .catch();
  };

  const handleLogout = () => {
    setAuth(false);
    sessionStorage.setItem("jwt", "");
  };

  if (auth) {
    return <App />;
  } else {
    return (
      <div className="flex flex-col justify-center p-4 items-center h-[100vh]">
        <div className="flex flex-col bg-customblue-900 px-20 h-[40vh] items-center justify-center space-y-10 rounded-xl">
          <div className="flex flex-col space-y-2">
            <label htmlFor="userInput">Email:</label>
            <input
              name="username"
              id="userInput"
              type="email"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="passwordInput">Password:</label>
            <input
              name="password"
              id="passwordInput"
              type="password"
              onChange={handleChange}
            />
          </div>
          <button
            className="bg-white px-5 rounded-xl py-1"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    );
  }
};

export default Login;
