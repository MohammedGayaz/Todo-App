const fs = require('fs').promises;
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
      this.todoList = existingData || [];
      if (this.todoList.length > 0)
        this.taskCounter = this.todoList[this.todoList.length - 1].id;
      else {
        this.taskCounter = 0;
      }
      return existingData;
    } catch (error) {
      throw error;
    }
  }

  getIndex(id) {
    const taskItem = this.todoList.find((item) => item.id === id);
    const taskIndex = this.todoList.indexOf(taskItem);
    return taskIndex;
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
    const index = this.getIndex(id);
    return this.todoList[index];
  }
}

module.exports = Todo

// async function run() {
//   const todo = new Todo();
//   await todo.initializeData();
//   console.log("Data initialized");

//   await todo.addTask("t2", "d2");
//   await todo.addTask("t3", "d3");
  
//   await todo.deleteTask(2);

//   await todo.updateTask(1, "t0", "d0", true)

//   console.log(todo.getAll())
//   console.log(todo.getIdTask(2))
// }

// run();
