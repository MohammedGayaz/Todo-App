import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();
    await axios({
      method: "post",
      url: "http://localhost:3000/api/v1/auth/register",
      data: { name, username, password },
    })
      .then((res) => {
        console.log(res.data);
        navigate("/login");
        setName("");
        setUsername("");
        setPassword("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <br />
        <input type="text" onChange={(e) => setName(e.target.value)} />
        <br />

        <label htmlFor="username">Username: </label>
        <br />
        <input type="email" onChange={(e) => setUsername(e.target.value)} />
        <br />

        <label htmlFor="password">Password: </label>
        <br />
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button onClick={registerUser}>Register</button>
      </form>
    </div>
  );
}

export default Register;
