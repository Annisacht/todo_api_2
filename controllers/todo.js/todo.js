const Todo = require('../../mongodb/scheme/todo');

async function createTodo(req, res) {
  try {
    const { title, completed, dueDate } = req.body;
    const userId = req.user && req.user.user_id; // Pastikan req.user terdefinisi dan mengambil user_id

    if (!userId) {
      return res.status(400).json({ message: 'User ID not available' });
    }

    const newTodo = await Todo.create({
      title,
      completed,
      dueDate,
      user: userId, // Simpan userId sebagai pembuat Todo
    });

    res.status(201).json({
      message: 'Todo created successfully',
      todo: newTodo,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create todo', error });
  }
}

async function getAllTodos(req, res) {
  try {
    const userId = req.user && req.user.user_id; // Ambil ID pengguna dari autentikasi jika tersedia

    if (!userId) {
      return res.status(400).json({ message: 'User ID not available' });
    }

    const todos = await Todo.find({ user: userId });

    res.status(200).json({ todos });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch todos', error });
  }
}

async function getTodoById(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user && req.user.user_id; // Ambil ID pengguna dari autentikasi jika tersedia

    if (!userId) {
      return res.status(400).json({ message: 'User ID not available' });
    }

    const todo = await Todo.findOne({ _id: id, user: userId });

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found or unauthorized' });
    }

    res.status(200).json({ todo });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch todo', error });
  }
}

async function updateTodoById(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user && req.user.user_id;
    const { title, completed, dueDate } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'User ID not available' });
    }

    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id, user: userId },
      { title, completed, dueDate },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found or unauthorized' });
    }

    // Debugging: Tambahkan log untuk mengecek nilai completed yang berhasil diupdate
    console.log('Nilai completed yang berhasil diupdate:', updatedTodo.completed);

    res.status(200).json({
      message: 'Todo updated successfully',
      todo: updatedTodo,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update todo', error });
  }
}



async function deleteTodoById(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user && req.user.user_id; // Ambil ID pengguna dari autentikasi jika tersedia

    if (!userId) {
      return res.status(400).json({ message: 'User ID not available' });
    }

    const deletedTodo = await Todo.findOneAndDelete({ _id: id, user: userId });

    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found or unauthorized' });
    }

    res.status(200).json({
      message: 'Todo deleted successfully',
      todo: deletedTodo,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete todo', error });
  }
}

module.exports = {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodoById,
  deleteTodoById,
};
