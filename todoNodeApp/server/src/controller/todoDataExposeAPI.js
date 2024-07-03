const { APIDataMapper } = require("../../services/APIDataMapper");
/** Data layer */
const { getAllDataFromDB } = require("../../services/database/db_operations");

/** Business layer */
const { insertSubTasksInsideTodo } = require("../../services/todoDataService");

const todoDataExposeAPI = async (req, res) => {
  // Get all Todos and Subtasks data from database
  const { data } = await getAllDataFromDB();
  const { allTodos, allSubtasks } = data;

  // put subtask into todo data
  const allTodosWithSubTasks = insertSubTasksInsideTodo({
    allTodos,
    allSubtasks,
  });
  // Create API data
  const allTodosWithSubTasksJSON = APIDataMapper({
    data: allTodosWithSubTasks,
    type: "todosList",
  });

  res.json({
    results: allTodosWithSubTasksJSON,
  });
};

module.exports = { todoDataExposeAPI };
