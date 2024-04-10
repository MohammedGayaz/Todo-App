import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useTodo } from "../context/TaskContext";
import { useNavigate } from "react-router-dom";
import CardWraper from "../wraper/CardWraper";
import MainHeading from "../components/MainHeading";
import InputComponent from "../components/InputComponent";
import TextArea from "../components/TextArea";

function Create() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { token } = useAuth();
  const { tasks, setTasks } = useTodo();
  const navigate = useNavigate();

  const createTask = async (e) => {
    e.preventDefault();
    await axios({
      method: "post",
      url: "http://localhost:3000/api/v1/user/todo/create",
      headers: {
        Authorization: token,
      },
      data: { title, description },
    })
      .then((res) => {
        console.log("task created successfully", res);
        setTasks([...tasks, { title, description }]);
        console.log(tasks);
        navigate("/tasks");
      })
      .catch((err) => console.log("error", err));
  };

  return (
    <CardWraper>
      <div>
        <InputComponent
          label={"Title:"}
          type={"text"}
          placeholder={"example task"}
          setTarget={setTitle}
        />
        <TextArea
          label={"Description:"}
          placeholder={"example task description"}
          setTarget={setDescription}
        />

        <div className="p-5">
          <button
            onClick={createTask}
            className="w-full text-white bg-green-700 hover:bg-green-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2yy"
          >
            Create Task
          </button>
        </div>
      </div>
    </CardWraper>
  );
}

export default Create;
