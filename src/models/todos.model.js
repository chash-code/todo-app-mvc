```javascript
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Todo Model
 * 
 * Handles all data operations for todos
 * Follows Single Responsibility Principle
 */
class TodoModel {
  constructor() {
    this.dbPath = path.join(__dirname, '../db.json');
    this.db = this.loadDatabase();
  }

  /**
   * Load database from db.json
   * @returns {Object} Database object
   */
  loadDatabase() {
    try {
      const data = fs.readFileSync(this.dbPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading database:', error.message);
      return { todos: [] };
    }
  }

  /**
   * Save database to db.json
   */
  saveDatabase() {
    try {
      fs.writeFileSync(this.dbPath, JSON.stringify(this.db, null, 2), 'utf-8');
    } catch (error) {
      console.error('Error saving database:', error.message);
      throw new Error('Failed to save data');
    }
  }

  /**
   * Get all todos
   * @returns {Array} Array of todos
   */
  getAllTodos() {
    return this.db.todos;
  }

  /**
   * Get todo by ID
   * @param {string} id - Todo ID
   * @returns {Object|null} Todo object or null
   */
  getTodoById(id) {
    return this.db.todos.find(todo => todo.id === id) || null;
  }

  /**
   * Create new todo
   * @param {Object} todoData - Todo data
   * @returns {Object} Created todo
   */
  createTodo(todoData) {
    const newTodo = {
      id: this.generateId(),
      title: todoData.title,
      completed: todoData.completed || false,
      createdAt: new Date().toISOString()
    };

    this.db.todos.push(newTodo);
    this.saveDatabase();

    return newTodo;
  }

  /**
   * Update existing todo
   * @param {string} id - Todo ID
   * @param {Object} updates - Updates to apply
   * @returns {Object|null} Updated todo or null
   */
  updateTodo(id, updates) {
    const todoIndex = this.db.todos.findIndex(todo => todo.id === id);

    if (todoIndex === -1) {
      return null;
    }

    // Apply updates
    if (updates.title !== undefined) {
      this.db.todos[todoIndex].title = updates.title;
    }

    if (updates.completed !== undefined) {
      this.db.todos[todoIndex].completed = updates.completed;
    }

    this.db.todos[todoIndex].updatedAt = new Date().toISOString();

    this.saveDatabase();

    return this.db.todos[todoIndex];
  }

  /**
   * Delete todo
   * @param {string} id - Todo ID
   * @returns {Object|null} Deleted todo or null
   */
  deleteTodo(id) {
    const todoIndex = this.db.todos.findIndex(todo => todo.id === id);

    if (todoIndex === -1) {
      return null;
    }

    const deletedTodo = this.db.todos.splice(todoIndex, 1)[0];
    this.saveDatabase();

    return deletedTodo;
  }

  /**
   * Generate unique ID
   * @returns {string} Unique ID
   */
  generateId() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    return `${timestamp}_${random}`;
  }

  /**
   * Check if todo exists
   * @param {string} id - Todo ID
   * @returns {boolean} True if exists
   */
  todoExists(id) {
    return this.db.todos.some(todo => todo.id === id);
  }
}

// Export singleton instance
export default new TodoModel();
```
