const express = require('express')
const Todo = require('./Todo')


const todo = new Todo();
const app = express()
app.use(express.json())

app.get('/todos', async(req, res)=>{
    try{
        let data = todo.getAll();
        res.status(200).json(data);
    }
    catch(error){
        throw error;
    }
})

app.get('/todos/:id', async(req, res)=>{
    let id = parseInt(req.params.id);
    let idData = todo.getIdTask(id)
    if(!idData){
    res.status(404).send()
    }
    else{
    res.status(200).json(idData);
    }
})

async function startServer(){
    try{
        await todo.initializeData()
        app.listen(3000,()=>{
            console.log("server listening at port 3000")
        })
    }
    catch(error){
        console.error("Error in initializing data: ", error)
    }
}

startServer()
