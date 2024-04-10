import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CardWraper from "../wraper/CardWraper";
import MainHeading from "../components/MainHeading";
import SubHeading from "../components/SubHeading";
import InputComponent from "../components/InputComponent";
import LinkButton from "../components/LinkButton";

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
        navigate("/");
        setName("");
        setUsername("");
        setPassword("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <CardWraper>
      <div>
        <MainHeading title={"Register"} />
        <SubHeading text={"Enter your information to register."} />
        <InputComponent
          label={"Name"}
          type={"text"}
          placeholder={"Your Name"}
          setTarget={setName}
        />
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
            onClick={registerUser}
            className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          >
            Register
          </button>
        </div>
        <LinkButton
          text={"Alredy have an Account?"}
          buttonText={" Sing in"}
          to={"/"}
        />
      </div>
    </CardWraper>
  );
}

export default Register;
