# TODO API with CRUD Operations

This is a simple backend server which provides basic CRUD operations for managing tasks. It includes routes for creating, retrieving, updating, and deleting tasks.

## Routes

### Create a Task

**POST /tasks**

Create a new task with the given parameters.

- **Input:**
  - `title` (string, required): Title of the task.
  - `description` (string, required): Description of the task.
  - `done` (boolean, optional, default: false): Status of the task (marked as done or not).

- **Example:**
  ```json
  {
    "title": "Complete README.md",
    "description": "Create a README.md file for the TODO application.",
    "done": false
  }

- **Output:**
  - Success message or error.

### Retrieve All Tasks

**GET /tasks**

Retrieve a list of all tasks.

- **Output:**
  - An array of task objects.

### Update a Task by ID

**PUT /tasks/:id**

Update an existing task with the given ID.

- **Input:**
  - `title` (string, optional): New title for the task.
  - `description` (string, optional): New description for the task.
  - `done` (boolean, optional): New status for the task (marked as done or not).

- **Example:**
  ```json
  {
    "title": "Updated Title",
    "done": true
  }

- **Output:**
  - Success message or error.

### Delete a Task by ID

**DELETE /tasks/:id**

Delete an existing task with the given ID.

- **Output:**
  - Success message or error.

  
