import React, { useState } from "react";
import { useTodo } from "../context/TaskContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

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
        alert("Update Successful");
        navigate("/tasks");
      })
      .catch((err) => console.log("error".err));
  };

  return (
    <div>
      <form onSubmit={updateTask}>
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
        <input type="submit" value="Update Task" />
      </form>
    </div>
  );
}

export default Update;
