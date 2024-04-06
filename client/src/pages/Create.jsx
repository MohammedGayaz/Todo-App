import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useTodo } from "../context/TaskContext";
import { useNavigate } from "react-router-dom";

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
    <div>
      <form onSubmit={createTask}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <br />
        <input type="submit" value="Create Task" />
      </form>
    </div>
  );
}

export default Create;
