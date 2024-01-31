const express = require("express");
const { taskCreation, taskUpdation } = require("../validation/validation");
const { Task } = require("../db");
const router = express.Router()



router.post("/create", async(req, res) =>{
    const {success} = taskCreation.safeParse(req.body);
    if(!success){
        return res.status(403).json({message : "Invalid inputs"})
    }

    const task = await Task.create({
        title: req.body.title,
        description: req.body.description,
        completed: false,
    })
    res.status(200).json({message: "task created Successfully"})
})


router.get("/tasks", async(req, res)=>{
    const taskList = await Task.find({})
    res.status(200).json({list: taskList})
})


router.put("/update/:id", async(req, res) => {
    const {success} = taskUpdation.safeParse(req.body);
    if(!success){
        return res.status(403).json({message: "Invalid Inuts"})
    }
    const task = await Task.findOneAndUpdate({
        _id : req.params.id,
    }, req.body);
    if(!task){
        return res.status(404).json({message: "Task not found"})
    }
    res.status(200).json({message: "task updated successfully."})
})


router.delete("/delete/:id", async(req, res) =>{
    const task = await Task.findOneAndDelete({
        _id: req.params.id,
    })
    if(!task){
        return res.status(404).json({message: "Task not found"})
    }
    res.status(200).json({message: "task deleted successfully."})
})

module.exports = router