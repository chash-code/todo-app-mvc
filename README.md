
# Todo Application - MVC Architecture & Standard Coding Practice

A well-structured Todo application built with Express.js following MVC (Model-View-Controller) architecture and industry-standard coding practices.

## Features

✅ **MVC Architecture**: Clean separation of concerns
✅ **ES6 Modules**: Modern JavaScript import/export syntax
✅ **RESTful API**: Standard HTTP methods and status codes
✅ **Error Handling**: Comprehensive try-catch blocks
✅ **Data Validation**: Input validation on all endpoints
✅ **Single Responsibility**: Each component has one purpose
✅ **Clean Code**: Readable, maintainable, documented

## Project Structure

```
src/
├── index.js              # Application entry point
├── routes/
│   └── todos.routes.js   # Route definitions (Routing layer)
├── controllers/
│   └── todos.controller.js  # Business logic (Controller layer)
├── models/
│   └── todos.model.js    # Data operations (Model layer)
└── db.json               # Data storage
```

## MVC Architecture Explained

### Model Layer (`models/todos.model.js`)
- **Responsibility**: Data access and manipulation
- **Contains**: Database operations (CRUD)
- **Does NOT**: Handle HTTP requests/responses
- **Methods**:
  - `getAllTodos()` - Retrieve all todos
  - `getTodoById(id)` - Retrieve single todo
  - `createTodo(data)` - Create new todo
  - `updateTodo(id, updates)` - Update existing todo
  - `deleteTodo(id)` - Delete todo
  - `todoExists(id)` - Check if todo exists
  - `generateId()` - Generate unique ID

### Controller Layer (`controllers/todos.controller.js`)
- **Responsibility**: Business logic and request handling
- **Contains**: Validation, error handling, response formatting
- **Does NOT**: Direct database operations
- **Methods**:
  - `getAllTodos(req, res, next)` - Handle GET all request
  - `getTodoById(req, res, next)` - Handle GET by ID request
  - `createTodo(req, res, next)` - Handle POST request
  - `updateTodo(req, res, next)` - Handle PUT request
  - `deleteTodo(req, res, next)` - Handle DELETE request

### Routes Layer (`routes/todos.routes.js`)
- **Responsibility**: Define API endpoints
- **Contains**: Route definitions and HTTP method mapping
- **Does NOT**: Business logic or data operations
- **Routes**:
  - `GET /todos` → `getAllTodos`
  - `GET /todos/:id` → `getTodoById`
  - `POST /todos` → `createTodo`
  - `PUT /todos/:id` → `updateTodo`
  - `DELETE /todos/:id` → `deleteTodo`
