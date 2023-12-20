const fs = require('fs').promises;
const {error} = require('console');
const path = require('path');

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
      console.log("in writeData data:", data)
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
            console.log("not in existingData")
            this.todoList = [];
            this.taskCounter = 0;
        }
        else{
            console.log("in existingData")
            this.todoList = existingData;
            this.taskCounter = this.todoList[this.todoList.length - 1].id;
        }
        console.log("data initialized")
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
    const index = this.getIndex(id);
    this.todoList.splice(index, 1);
    await this.updateFileData(this.todoList);
  }

  async updateTask(id, title, description, state) {
    const index = this.getIndex(id);
    this.todoList[index] = {
      id: id,
      title: title,
      description: description,
      completed: state,
    };
    await this.updateFileData(this.todoList);
  }

  getAll() {
    return this.todoList;
  }

  getIdTask(id) {
    const taskItem = this.todoList.find((item) => item.id === id);
      return taskItem;
  }
}

module.exports = Todo

// async function run() {
// const todo = new Todo();
// await todo.initializeData();
// console.log("Data initialized");

// await todo.addTask("t2", "d2");
// await todo.addTask("t3", "d3");

// await todo.deleteTask(2);

// await todo.updateTask(1, "t0", "d0", true)

// console.log(todo.getAll())
// console.log(todo.getIdTask(2))
// let data = todo.getIdTask(1)
// console.log(data)
// }

// run();
