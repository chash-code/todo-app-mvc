```javascript
import todoModel from '../models/todos.model.js';

/**
 * Todo Controller
 * 
 * Handles business logic and request/response processing
 * Follows Single Responsibility Principle
 */
class TodoController {
  /**
   * Get all todos
   * @route GET /todos
   */
  async getAllTodos(req, res, next) {
    try {
      const todos = todoModel.getAllTodos();

      return res.status(200).json({
        success: true,
        count: todos.length,
        data: todos
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get single todo by ID
   * @route GET /todos/:id
   */
  async getTodoById(req, res, next) {
    try {
      const { id } = req.params;

      const todo = todoModel.getTodoById(id);

      if (!todo) {
        return res.status(404).json({
          success: false,
          error: 'Todo not found'
        });
      }

      return res.status(200).json({
        success: true,
        data: todo
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create new todo
   * @route POST /todos
   */
  async createTodo(req, res, next) {
    try {
      const { title, completed } = req.body;

      // Validation
      if (!title || title.trim() === '') {
        return res.status(400).json({
          success: false,
          error: 'Title is required'
        });
      }

      if (title.length > 200) {
        return res.status(400).json({
          success: false,
          error: 'Title must be less than 200 characters'
        });
      }

      const newTodo = todoModel.createTodo({ title, completed });

      return res.status(201).json({
        success: true,
        message: 'Todo created successfully',
        data: newTodo
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update existing todo
   * @route PUT /todos/:id
   */
  async updateTodo(req, res, next) {
    try {
      const { id } = req.params;
      const { title, completed } = req.body;

      // Check if todo exists
      if (!todoModel.todoExists(id)) {
        return res.status(404).json({
          success: false,
          error: 'Todo not found'
        });
      }

      // Validation
      if (title !== undefined && title.trim() === '') {
        return res.status(400).json({
          success: false,
          error: 'Title cannot be empty'
        });
      }

      if (title !== undefined && title.length > 200) {
        return res.status(400).json({
          success: false,
          error: 'Title must be less than 200 characters'
        });
      }

      const updatedTodo = todoModel.updateTodo(id, { title, completed });

      return res.status(200).json({
        success: true,
        message: 'Todo updated successfully',
        data: updatedTodo
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete todo
   * @route DELETE /todos/:id
   */
  async deleteTodo(req, res, next) {
    try {
      const { id } = req.params;

      const deletedTodo = todoModel.deleteTodo(id);

      if (!deletedTodo) {
        return res.status(404).json({
          success: false,
          error: 'Todo not found'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Todo deleted successfully',
        data: deletedTodo
      });
    } catch (error) {
      next(error);
    }
  }
}

// Export singleton instance
export default new TodoController();
```
