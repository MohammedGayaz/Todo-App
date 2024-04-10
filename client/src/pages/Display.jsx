import React from "react";
import { useTodo } from "../context/TaskContext";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import CardWraper from "../wraper/CardWraper";

function Display() {
  const { tasks, setTasks } = useTodo();
  const { token } = useAuth();
  const navigate = useNavigate();
  const deleteItem = async (task, id) => {
    console.log(task, id);
    await axios({
      method: "delete",
      url: `http://localhost:3000/api/v1/user/todo/delete/${id}`,
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        console.log("item deleted successfully", res);
        const newList = tasks.filter((task) => task._id !== id);
        setTasks(newList);
      })
      .catch((err) => console.log("error in deleting in item ", err));
  };

  const createTask = () => {
    navigate("/create");
  };

  return (
    <div>
      <button onClick={createTask}>Create Task</button>
      {tasks.map((item) => {
        return (
          <CardWraper>
            <div key={item._id}>
              {item.title} - {item.description}
              <button onClick={() => navigate(`/update/${item._id}`)}>
                Update
              </button>
              <button onClick={() => deleteItem(item, item._id)}>Delete</button>
            </div>
          </CardWraper>
        );
      })}
    </div>
  );
}

export default Display;
