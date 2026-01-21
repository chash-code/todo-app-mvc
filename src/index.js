```javascript
import express from 'express';
import todosRoutes from './routes/todos.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/todos', todosRoutes);

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Todo Application - MVC Architecture',
    version: '1.0.0',
    endpoints: {
      createTodo: 'POST /todos',
      getAllTodos: 'GET /todos',
      getTodoById: 'GET /todos/:id',
      updateTodo: 'PUT /todos/:id',
      deleteTodo: 'DELETE /todos/:id'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
```
