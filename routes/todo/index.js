const express = require('express');
const router = express.Router();
const todoController = require('../../controllers/todo.js/todo');
const authMiddleware = require('../../middlewares/auth/validation');

// Gunakan middleware pada rute-rute yang memerlukan autentikasi
router.post('/', authMiddleware.authenticateToken, todoController.createTodo);
router.get('/', authMiddleware.authenticateToken, todoController.getAllTodos);
router.get('/:id', authMiddleware.authenticateToken, todoController.getTodoById);
router.put('/:id', authMiddleware.authenticateToken, todoController.updateTodoById);
router.delete('/:id', authMiddleware.authenticateToken, todoController.deleteTodoById);


module.exports = router