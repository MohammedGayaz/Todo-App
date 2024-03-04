// componenet to render a single todo

export function Todos({todo}){
    return <div style={style.todoTask}>
        <h1>{todo.title}</h1>
        <h3>{todo.description}</h3>
        <button>{todo.completed == true ? "Done" : "Mark as Done"}</button>
    </div>
}


const style = {
    todoTask: {
        fontFamily: "Arial, Helvetica, sans-serif",
        margin: "10px",
        padding: "10px",
    }
}