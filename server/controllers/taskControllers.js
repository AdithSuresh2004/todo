const prisma = require("../lib/db");
const HTTP_STATUS_CODES = require("../configs/httpStatusCode");
const sendErrorResponse = require("../lib/sendErrorResponse");

const getTasks = async (req, res) => {
  const { userId } = req.user;
  const { todoId } = req.query;

  if (!userId) {
    return sendErrorResponse(
      res,
      HTTP_STATUS_CODES.UNAUTHORIZED,
      "Unauthorized access"
    );
  }

  if (!todoId) {
    return sendErrorResponse(
      res,
      HTTP_STATUS_CODES.BAD_REQUEST,
      "Todo ID is required"
    );
  }


  try {
    const tasks = await prisma.task.findMany({
      where: {
        Todo: {
          ownerId: userId,
          id: todoId,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const totalTasks = await prisma.task.count({
      where: {
        Todo: {
          ownerId: userId,
          id: todoId,
        },
      },
    });

    return res.status(HTTP_STATUS_CODES.OK).json({ tasks, totalTasks });
  } catch (error) {
    console.error("Error retrieving tasks:", error);
    return sendErrorResponse(
      res,
      HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      "Internal server error"
    );
  }
};

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      return sendErrorResponse(
        res,
        HTTP_STATUS_CODES.NOT_FOUND,
        "Task not found"
      );
    }

    return res.status(HTTP_STATUS_CODES.OK).json({ task });
  } catch (error) {
    console.error("Error retrieving task:", error);
    return sendErrorResponse(
      res,
      HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      "Internal server error"
    );
  }
};

const createTask = async (req, res) => {
  try {
    const { body, completed, todoId } = req.body;

    const newTask = await prisma.task.create({
      data: {
        body,
        completed,
        todoId,
      },
    });

    return res.status(HTTP_STATUS_CODES.CREATED).json({ task: newTask });
  } catch (error) {
    console.error("Error creating task:", error);
    return sendErrorResponse(
      res,
      HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      "Internal server error"
    );
  }
};

const updateTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const { body, completed, todoId } = req.body;

    const task = await prisma.task.findUnique({
      where: { id },
      select: { todoId: true },
    });

    if (!task) {
      return sendErrorResponse(
        res,
        HTTP_STATUS_CODES.NOT_FOUND,
        "Task not found"
      );
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: { body, completed, todoId },
    });

    return res.status(HTTP_STATUS_CODES.OK).json({ task: updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    return sendErrorResponse(
      res,
      HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      "Internal server error"
    );
  }
};

const deleteTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;

    const task = await prisma.task.findUnique({
      where: { id },
      select: { todoId: true },
    });

    if (!task) {
      return sendErrorResponse(
        res,
        HTTP_STATUS_CODES.NOT_FOUND,
        "Task not found"
      );
    }

    await prisma.task.delete({ where: { id } });

    return res
      .status(HTTP_STATUS_CODES.OK)
      .json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    return sendErrorResponse(
      res,
      HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      "Internal server error"
    );
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTaskById,
  deleteTaskById,
};
