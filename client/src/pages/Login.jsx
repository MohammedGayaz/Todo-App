import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { token, setToken } = useAuth();
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    await axios({
      method: "post",
      url: "http://localhost:3000/api/v1/auth/login",
      data: { username, password },
    })
      .then((res) => {
        setToken(res.data.token);
        console.log(res.data);
        setUsername("");
        setPassword("");
        navigate("/tasks");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form>
        <label htmlFor="username">Username: </label>
        <br />
        <input type="email" onChange={(e) => setUsername(e.target.value)} />
        <br />

        <label htmlFor="password">Password: </label>
        <br />
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button onClick={loginUser}>Login</button>
      </form>
    </div>
  );
}

export default Login;
