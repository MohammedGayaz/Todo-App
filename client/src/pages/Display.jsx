import React from "react";
import { useTodo } from "../context/TaskContext";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Todo from "../components/Todo";
import TodoContainer from "../wraper/TodoContainer";
import TodoParentContainer from "../wraper/TodoParentContainer";

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
    <TodoContainer>
      <button
        onClick={createTask}
        class="m-3 rounded-lg bg-green-600 p-2 px-5 font-bold text-white"
      >
        Create
      </button>
      <hr />
      <TodoParentContainer>
        {tasks.map((item) => (
          <Todo
            key={item._id}
            title={item.title}
            description={item.description}
            onUpdate={() => navigate(`/update/${item._id}`)}
            onDelete={() => deleteItem(item, item._id)}
          />
        ))}
      </TodoParentContainer>
    </TodoContainer>
  );
}

export default Display;
