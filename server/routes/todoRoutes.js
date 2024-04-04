const express = require("express");
const {
  addToTodo,
  getTodos,
  createTodo,
  deleteTodo,
} = require("../controllers/todoControllers");
const router = express.Router();

router.get("/todo", getTodos);
router.post("/createtodo", createTodo);
router.post("/deletetodo", deleteTodo);
router.post("/addTask", addToTodo);

module.exports = router;
