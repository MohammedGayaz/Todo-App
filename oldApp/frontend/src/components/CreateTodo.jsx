import { useState } from "react"

export function CreateTodo({addTodo}){
    const [title, setTitle] =  useState("");
    const [description, setDescription] =  useState("");

    return<div>
        <input style={style.TodoInput} type="text" placeholder="Title" onChange={(e)=>{
            const value = e.target.value
            setTitle(e.target.value)
            console.log(typeof(title))
        }}></input> <br />

        <input style={style.TodoInput} type="text" placeholder="Description" onChange={(e)=>{
            const value = e.target.value
            setDescription(e.target.value)
        }}></input> <br />
        <button onClick={()=>{
            fetch("http://localhost:3000/api/v1/todos/create", {
                method: "POST",
                body:JSON.stringify({
                    title: title,
                    description: description
                }),
                headers: {
                    "Content-Type" : "application/json"
                }
            })
            .then(async (res)=>{
                const json = await res.json();
                console.log(json)
                alert("Todo added Successufully.")
                addTodo({
                    title: title,
                    description: description
                })
            })
        }} style={style.TodoInput}>Add Todo</button>
    </div>
}

const style = {
    TodoInput: {
        padding: "10px",
        margin: "10px",
    }
}