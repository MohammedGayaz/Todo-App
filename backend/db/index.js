const mongoose = require("mongoose")
const {DB_URL} = require("../config")

mongoose.connect(DB_URL)

// defing task schema

const TaskScheme = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        trim: true,
        lowercase: true,
    },
    description: {
        type: String,
        require: true,
        trim: true,
        lowercase: true,
    },
    completed:{
        type: Boolean,
    }
})

// creating model form the schema
const Task = mongoose.model("Task", TaskScheme)


module.exports ={
    Task,
}