import React, { useState } from "react";
import { useTodo } from "../context/TaskContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CardWraper from "../wraper/CardWraper";
import InputComponent from "../components/InputComponent";
import TextArea from "../components/TextArea";

function Update() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { tasks, setTasks } = useTodo();
  const { token } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const updateTask = async (e) => {
    e.preventDefault();
    await axios({
      method: "put",
      url: `http://localhost:3000/api/v1/user/todo/update/${id}`,
      headers: {
        Authorization: token,
      },
      data: { title, description },
    })
      .then((res) => {
        const newList = tasks;
        newList[tasks.findIndex((item) => item._id === id)] = {
          title,
          description,
        };
        setTasks([...newList]);
        navigate("/tasks");
      })
      .catch((err) => console.log("error".err));
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
            onClick={updateTask}
            className="w-full text-white bg-green-700 hover:bg-green-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2yy"
          >
            Update Task
          </button>
        </div>
      </div>
    </CardWraper>
  );
}

export default Update;
