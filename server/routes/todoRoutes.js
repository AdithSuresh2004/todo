const express = require("express");
const {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
} = require("../controllers/todoControllers");

const router = express.Router();

router.get("/todos", getTodos);
router.post("/todos", createTodo);
router.delete("/todos/:todoId", deleteTodo);
router.put("/todos/:todoId", updateTodo);

module.exports = router;