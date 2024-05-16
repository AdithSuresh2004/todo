const prisma = require("../lib/db");
const HTTP_STATUS_CODES = require("../configs/httpStatusCode");
const sendErrorResponse = require("../lib/sendErrorResponse");

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

    const newTodo = await prisma.todo.create({
      data: {
        ownerId: userId,
        title,
      },
    });

    return res.status(HTTP_STATUS_CODES.CREATED).json({ todo: newTodo });
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
  const { todoId } = req.params;
  const { userId } = req.user;

  if (!todoId)
    return sendErrorResponse(
      res,
      HTTP_STATUS_CODES.BAD_REQUEST,
      "Todo ID is required."
    );

  try {
    const todo = await prisma.todo.findUnique({
      where: { id: todoId },
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

    await prisma.todo.delete({ where: { id: todoId } });

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

const updateTodo = async (req, res) => {
  const { todoId } = req.params;
  const { title } = req.body;
  const { userId } = req.user;

  try {
    const todo = await prisma.todo.findUnique({
      where: { id: todoId },
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
      where: { id: todoId },
      data: { title },
    });

    return res.status(HTTP_STATUS_CODES.OK).json({
      message: "Todo updated successfully.",
      todo: updatedTodo,
    });
    
  } catch (error) {
    console.error("Error updating todo:", error);
    return sendErrorResponse(
      res,
      HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      "Internal server error."
    );
  }
};

module.exports = { getTodos, createTodo, deleteTodo, updateTodo };
