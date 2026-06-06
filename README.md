# Task Manager - Full Stack Application

## Project Overview

This project is a **Personal Task Manager** built as part of the **Studio Graphene Full Stack Developer Assessment (Exercise 1)**.

The application allows a user to create, manage, update, and delete personal tasks. Users can also mark tasks as completed, filter tasks by status, search tasks by title, and view task statistics.

The goal of this project was to build a clean and functional full-stack application while maintaining simple architecture, reusable components, and a responsive user interface.

---

## Features

### Must Have Features

* Add a new task
* View all tasks
* Edit existing tasks
* Delete tasks with confirmation prompt
* Mark tasks as complete/incomplete
* Filter tasks by:

  * All
  * Active
  * Completed
* Tasks sorted by newest first

### Additional Features

* Search tasks by title
* Task statistics:

  * Total tasks
  * Active tasks
  * Completed tasks
* Overdue task highlighting
* Empty state UI
* Persistent storage using JSON file
* Responsive design for mobile and desktop

---

## Tech Stack

### Frontend

* **React (Vite)**
  Used for building a fast and component-based user interface.

* **Axios**
  Used for API communication between frontend and backend.

* **CSS**
  Used for styling and responsive UI.

### Backend

* **Node.js**

* **Express.js**
  Used for building REST APIs.

* **CORS**
  Enables communication between frontend and backend.

* **UUID**
  Generates unique IDs for tasks.

### Storage

* **JSON File (`tasks.json`)**
  Used for persistence across server restarts.

---

## Project Structure

```bash
task-manager/

├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskList.jsx
│   │   │   ├── TaskItem.jsx
│   │   │   ├── FilterBar.jsx
│   │   │   └── Stats.jsx
│   │   │
│   │   ├── services/
│   │   │   └── taskApi.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│
├── server/
│   ├── controllers/
│   │   └── taskController.js
│   │
│   ├── routes/
│   │   └── taskRoutes.js
│   │
│   ├── data/
│   │   └── tasks.json
│   │
│   ├── app.js
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## How to Run Locally

### Clone the Repository

```bash
git clone <https://github.com/29ayushkala/task-manager-fullstack.git>
cd task-manager
```

### Backend Setup

```bash
cd server
npm install
npm run dev
```

Backend will run on:

```text
http://localhost:5000
```

### Frontend Setup

Open a new terminal:

```bash
cd client
npm install
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

---

## API Documentation

### Get All Tasks

```http
GET /api/tasks
```

Response:

```json
[
  {
    "id": "1",
    "title": "Learn React",
    "description": "Hooks revision",
    "dueDate": "2026-06-10",
    "completed": false
  }
]
```

---

### Create Task

```http
POST /api/tasks
```

Request Body:

```json
{
  "title": "Learn React",
  "description": "Hooks Revision",
  "dueDate": "2026-06-10"
}
```

---

### Update Task

```http
PUT /api/tasks/:id
```

---

### Delete Task

```http
DELETE /api/tasks/:id
```

---

### Toggle Task Completion

```http
PATCH /api/tasks/:id/toggle
```

---

## Design Decisions

* React components were split into reusable parts for maintainability.
* State management is handled using React Hooks.
* REST APIs are separated into controllers and routes.
* JSON persistence was chosen to keep the architecture simple as allowed in the assignment brief.

---

## AI Usage Disclosure

AI tools were used occasionally to assist with brainstorming, debugging, UI refinements, and improving development speed. However, the final implementation, understanding of logic, debugging, and project integration were reviewed and understood during development.

---

## Future Improvements

If given more time, I would add:

* Drag and drop task reordering
* Better animations and accessibility improvements
* Unit/integration tests
* Authentication for multiple users
* SQLite database integration for scalability

---

## Author

Created as part of the **Studio Graphene Full Stack Developer Assessment**.
