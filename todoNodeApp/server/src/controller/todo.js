/** Data layer */
const { addTodoToDB } = require("../../services/database/db_operations");

/** Business layer */
const {
  updatingTodoWithSubtasks,
} = require("../../services/updatingTodoWithSubtasks");

// Add a todo to db
const addTodo = async (req, res) => {
  const { title } = req.body;
  // Add a todo to database
  const { message, status } = await addTodoToDB({ title: title });
  res.json({
    message: message,
    status: status,
  });
};
//Update a todo in db
const updateTodo = async (req, res) => {
  const { todo_id } = req.params;
  const { todo_status } = req.body;

  const { message, status } = await updatingTodoWithSubtasks({
    todo_id,
    todo_status,
  });
  res.json({
    message: message,
    status: status,
  });
};

module.exports = { addTodo, updateTodo };
