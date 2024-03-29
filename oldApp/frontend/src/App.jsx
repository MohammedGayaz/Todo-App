import { useEffect, useState } from 'react'
import './App.css'
import { CreateTodo } from './components/CreateTodo'
import { Todos } from './components/Todos'

function App() {
  const [todos, setTodos] = useState([])

  useEffect(()=>{
    fetch("http://localhost:3000/api/v1/todos/tasks")
    .then(async (res)=>{
    const json = await res.json();
    setTodos(json.list);
  })
  }, [])
  
  function addTodo(newTodo){
    setTodos([...todos, newTodo])
  }

  return (
    <div>
      <CreateTodo addTodo={addTodo}></CreateTodo>
      {todos.map( (item) => <Todos todo={item}></Todos> )}
    </div>
  )
}

export default App
