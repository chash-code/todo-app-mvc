```javascript
import express from 'express';
import todoController from '../controllers/todos.controller.js';

const router = express.Router();

/**
 * Todo Routes
 * 
 * All routes follow RESTful conventions
 * Routes are clean and only handle routing logic
 */

// GET /todos - Get all todos
router.get('/', todoController.getAllTodos.bind(todoController));

// GET /todos/:id - Get single todo
router.get('/:id', todoController.getTodoById.bind(todoController));

// POST /todos - Create new todo
router.post('/', todoController.createTodo.bind(todoController));

// PUT /todos/:id - Update todo
router.put('/:id', todoController.updateTodo.bind(todoController));

// DELETE /todos/:id - Delete todo
router.delete('/:id', todoController.deleteTodo.bind(todoController));

export default router;
```
