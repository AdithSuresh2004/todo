const express = require("express");
const router = express.Router();
const {
  getTasks,
  getTaskById,
  createTask,
  updateTaskById,
  deleteTaskById,
} = require("../controllers/taskControllers");

router.get("/tasks", getTasks);
router.get("/tasks/:id", getTaskById);
router.post("/tasks", createTask);
router.put("/tasks/:id", updateTaskById);
router.delete("/tasks/:id", deleteTaskById);

module.exports = router;
