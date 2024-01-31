export function Todos({todos}){
    return <div style={style.todoTask}>
        {todos.map((task) =>{ 
            return <div>
                <h1>{task.title}</h1>
                <h3>{task.description}</h3>
                <button>{task.completed == true ? "Done" : "Mark as Done"}</button>
            </div>
            })
        }
    </div>
}


const style = {
    todoTask: {
        fontFamily: "Arial, Helvetica, sans-serif",
        margin: "10px",
        padding: "10px",
    }
}