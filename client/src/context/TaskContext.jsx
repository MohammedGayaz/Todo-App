import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";

// create context
export const TodoContext = createContext();

// provide context
export const TodoProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const { token } = useAuth();

  const fetchInitialTasks = useCallback(async (jwtToken) => {
    console.log("this is token \n", jwtToken);
    await axios({
      method: "get",
      url: "http://localhost:3000/api/v1/user/todo/tasks",
      headers: {
        Authorization: jwtToken,
      },
    })
      .then((res) => {
        setTasks(res.data.todos);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (token) {
      console.log("checking token in useEffect todocnxt", token);
      fetchInitialTasks(token);
    } else {
      console.log("no token");
    }
  }, [token]);

  return (
    <TodoContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TodoContext.Provider>
  );
};

// use context
export const useTodo = () => {
  const context = useContext(TodoContext);
  return context;
};
