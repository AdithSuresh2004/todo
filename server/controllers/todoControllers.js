const prisma = require("../lib/db");
const HTTP_STATUS_CODES = require("../configs/httpStatusCode");
const sendErrorResponse = require("../lib/sendErrorResponse");
const validateUserInput = require("../lib/validateUserInput");

const getTodos = async (req, res) => {
  try {
    const { userId } = req.user;

    if (!userId) {
      return sendErrorResponse(
        res,
        HTTP_STATUS_CODES.UNAUTHORIZED,
        "Unauthorized"
      );
    }

    const todos = await prisma.todo.findMany({
      where: {
        ownerId: userId,
      },
    });

    if (!todos || todos.length === 0) {
      return sendErrorResponse(
        res,
        HTTP_STATUS_CODES.NOT_FOUND,
        "Todo not found"
      );
    }

    return res.status(HTTP_STATUS_CODES.OK).json({ todos });
  } catch (error) {
    console.error("Error retrieving todos:", error);
    return sendErrorResponse(
      res,
      HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      "Internal server error"
    );
  }
};

const createTodo = async (req, res) => {
  try {
    const { title } = req.body;
    const { userId } = req.user;

    const validationError = validateUserInput(title, userId);
    if (validationError) {
      return sendErrorResponse(
        res,
        HTTP_STATUS_CODES.BAD_REQUEST,
        validationError
      );
    }

    await prisma.todo.create({
      data: {
        ownerId: userId,
        title,
      },
    });

    return res
      .status(HTTP_STATUS_CODES.OK)
      .json({ message: "Todo list created successfully." });
  } catch (error) {
    console.error("Error creating todo:", error);
    return sendErrorResponse(
      res,
      HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      "Internal server error"
    );
  }
};

const deleteTodo = async (req, res) => {
  const { todoId } = req.body;
  const { userId } = req.user;
  const id = todoId;

  try {
    const todo = await prisma.todo.findUnique({
      where: { id },
      select: { ownerId: true },
    });

    if (!todo) {
      return sendErrorResponse(
        res,
        HTTP_STATUS_CODES.NOT_FOUND,
        "Todo not found."
      );
    }

    if (todo.ownerId !== userId) {
      return sendErrorResponse(
        res,
        HTTP_STATUS_CODES.FORBIDDEN,
        "Unauthorized"
      );
    }

    await prisma.todo.delete({ where: { id } });

    return res
      .status(HTTP_STATUS_CODES.OK)
      .json({ message: "Todo deleted successfully." });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return sendErrorResponse(
      res,
      HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      "Internal server error."
    );
  }
};

const addToTodo = async (req, res) => {
  const { task, status } = req.body;
  const { userId } = req.user;

  if (!task || !status) {
    return sendErrorResponse(
      res,
      HTTP_STATUS_CODES.BAD_REQUEST,
      "No data provided"
    );
  }

  try {
    const user = await findUserByUsername(userId);

    if (!user) {
      return sendErrorResponse(
        res,
        HTTP_STATUS_CODES.NOT_FOUND,
        "User not found."
      );
    }

    await prisma.task.create({
      data: {
        completed: status,
        body: task,
        Todo: { connect: { id: user.todos[0].id } },
      },
    });

    return res
      .status(HTTP_STATUS_CODES.OK)
      .json({ message: "Todo added successfully." });
  } catch (error) {
    console.error("Error adding todo:", error);
    return sendErrorResponse(
      res,
      HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      "Internal server error."
    );
  }
};

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const { userId } = req.user;

  try {
    const todo = await prisma.todo.findUnique({
      where: { id },
      select: { ownerId: true },
    });

    if (!todo) {
      return sendErrorResponse(
        res,
        HTTP_STATUS_CODES.NOT_FOUND,
        "Todo not found."
      );
    }

    if (todo.ownerId !== userId) {
      return sendErrorResponse(
        res,
        HTTP_STATUS_CODES.FORBIDDEN,
        "Unauthorized"
      );
    }

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { completed },
    });

    return res.status(HTTP_STATUS_CODES.OK).json({
      message: "Todo status updated successfully.",
      todo: updatedTodo,
    });
  } catch (error) {
    console.error("Error updating todo status:", error);
    return sendErrorResponse(
      res,
      HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      "Internal server error."
    );
  }
};

module.exports = { getTodos, createTodo, addToTodo, deleteTodo, updateStatus };
