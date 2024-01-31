const fs = require('fs').promises;
const {error, time} = require('console');
const path = require('path');
const {title} = require('process');

const filePath = path.join(__dirname, 'task.json');

class Todo {
    constructor() {
        this.taskCounter = 0;
        this.todoList = [];
    }

    async readFileData() {
        try {
            const stringData = await fs.readFile(filePath);
            const data = JSON.parse(stringData);
            return data;
        } catch (error) {
            throw error;
        }
    }

    async writeFileData(data) {
        const writeData = JSON.stringify(data);
        try {
            await fs.writeFile(filePath, writeData);
            console.log("File updated");
        } catch (error) {
            throw error;
        }
    }

    async initializeData() {
        try {
            const existingData = await this.readFileData();
            if(existingData.length === 0){
                this.todoList = [];
                this.taskCounter = 0;
            }
            else{
                this.todoList = existingData;
                this.taskCounter = this.todoList[this.todoList.length - 1].id;
            }
            // return existingData;
        } catch (error) {
            throw error;
        }
    }

    async updateFileData(data) {
        await this.writeFileData(data);
    }

    // main methods
    async addTask(title, description) {
        const task = {
            id: ++this.taskCounter,
            title: title,
            description: description,
            completed: false,
        };
        this.todoList.push(task);
        await this.updateFileData(this.todoList);
    }

    async deleteTask(id) {
        try{
            const index = this.getIndex(id);
            if (index < 0){
                throw "invalid index"
            }
            else{
                this.todoList.splice(index, 1);
                await this.updateFileData(this.todoList);
            }
        }
        catch(error){
            throw error;
        }
    }

    async updateTask(id, state) {
        try{
            const index = this.getIndex(id)
            const title = this.todoList[index].title;
            const desc = this.todoList[index].description;
            this.todoList[index] = {
                id : id,
                title : title,
                description: desc,
                completed: state,
            };
            await this.updateFileData(this.todoList);
        }
        catch(error){
            throw error;
        }
    }

    getAll() {
        return this.todoList;
    }

    getIdTask(id) {
        try{

            let index = this.getIndex(id)
            return this.todoList[index];
        }
        catch(error){
            throw error;
        }
    }

    getIndex(id) {
        try{
            const taskItem = this.todoList.find((item) => item.id === id);
            const taskIndex = this.todoList.indexOf(taskItem);
            return taskIndex;
        }
        catch(error){
            throw error;
        }
    }

}

module.exports = Todo

// async function run() {
// const todo = new Todo();
// await todo.initializeData();
// console.log("Data initialized");

// await todo.updateTask(2, true)
// }

// run();
