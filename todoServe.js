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
        res.status(500).json({msg:"Internal server problem"})
    }
})

app.get('/todos/:id', async(req, res)=>{
    let id = parseInt(req.params.id);
    let idData = todo.getIdTask(id)
    if(!idData){
        res.status(404).send("invlaid id")
    }
    else{
        res.status(200).json(idData);
    }
})


app.post('/todos', async(req, res)=>{
    let {title, description} = req.body
    try{
        if(!title || !description)
            throw "cannot be empty"
        else{
            await todo.addTask(title, description);
            res.status(201).json(msg = "created task sucessfully.")
        }
    }
    catch(error){
        res.status(406).json(msg=error)
    }
})


app.put('/todos/:id', async(req, res)=>{
    let id = parseInt(req.params.id);
    let {completed} = req.body
    try{
        await todo.updateTask(id, completed)
        res.status(201).send("file updated")
    }
    catch(error){
        res.status(404).send("Invalid Id");
    }
});


app.delete('/todos/:id', async (req, res)=>{
    let id = parseInt(req.params.id);
    console.log(id)
    try{
        await todo.deleteTask(id);
        res.status(200).send()
    }
    catch(error){
        res.status(404).send("invlaid Id");
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
