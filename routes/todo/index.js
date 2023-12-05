const express = require('express');
const router = express.Router();

//controller
const todoController = require('../../controllers/todo.js/todo');

//middleware
const authMiddleware = require('../../middlewares/auth/validation');

router.post('/', authMiddleware.authenticateToken, todoController.createTodo);
router.get('/', authMiddleware.authenticateToken, todoController.getAllTodos);
router.get('/:id', authMiddleware.authenticateToken, todoController.getTodoById);
router.put('/:id', authMiddleware.authenticateToken, todoController.updateTodoById);
router.delete('/:id', authMiddleware.authenticateToken, todoController.deleteTodoById);


module.exports = router