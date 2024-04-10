import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import MainHeading from "../components/MainHeading";
import CardWraper from "../wraper/CardWraper";
import InputComponent from "../components/InputComponent";
import LinkButton from "../components/LinkButton";
import SubHeading from "../components/SubHeading";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { token, setToken } = useAuth();
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    console.log(username, password);
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
    <CardWraper>
      <div>
        <MainHeading
          title={"Login"}
          subHeading={"Enter your information to login"}
        />
        <SubHeading text={"Enter your information to Login"} />
        <InputComponent
          label={"Username"}
          type={"email"}
          placeholder={"example@mail.com"}
          setTarget={setUsername}
        />
        <InputComponent
          label={"Password"}
          type={"password"}
          placeholder={"******"}
          setTarget={setPassword}
        />
        <div className="p-5">
          <button
            onClick={loginUser}
            className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2yy"
          >
            Login
          </button>
        </div>

        <LinkButton
          text={"Dont have an Account?"}
          buttonText={" Sing up"}
          to={"/register"}
        />
      </div>
    </CardWraper>
  );
}

export default Login;
