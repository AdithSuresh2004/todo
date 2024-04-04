const prisma = require("../lib/db");
const bcrypt = require("bcrypt");
const generateToken = require("../lib/generateToken");
const sendErrorResponse = require("../lib/sendErrorResponse");
const validateUserInput = require("../lib/validateUserInput");
const HTTP_STATUS_CODES = require("../configs/httpStatusCode");

const findUserByUsername = async (username) => {
  return await prisma.user.findUnique({
    where: { username },
  });
};

const findTodosById = async (id) => {
  return await prisma.todo.findMany({ where: { ownerId: id } });
};

const updateTodosOwnerId = async (todos, newId) => {
  await prisma.todo.updateMany({
    where: {
      id: { in: todos.map((todo) => todo.id) },
    },
    data: { ownerId: newId },
  });
};

const register = async (req, res) => {
  const { username, password } = req.body;

  const inputError = validateUserInput(username, password);
  if (inputError) {
    return sendErrorResponse(res, HTTP_STATUS_CODES.BAD_REQUEST, inputError);
  }

  const existingUserByUsername = await findUserByUsername(username);
  if (existingUserByUsername) {
    return sendErrorResponse(
      res,
      HTTP_STATUS_CODES.CONFLICT,
      "Username is already used."
    );
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { username, password: hashedPassword },
    });

    res.status(HTTP_STATUS_CODES.OK).send(newUser);
  } catch (error) {
    console.error(error);
    sendErrorResponse(
      res,
      HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      "Failed to register user."
    );
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const { userId } = req.user;

  const inputError = validateUserInput(username, password);
  if (inputError) {
    return sendErrorResponse(res, HTTP_STATUS_CODES.BAD_REQUEST, inputError);
  }

  try {
    const user = await findUserByUsername(username);
    if (!user) {
      return sendErrorResponse(
        res,
        HTTP_STATUS_CODES.UNAUTHORIZED,
        "Incorrect username."
      );
    }

    const validPassword = bcrypt.compare(password, user.password);
    if (!validPassword) {
      return sendErrorResponse(
        res,
        HTTP_STATUS_CODES.UNAUTHORIZED,
        "Incorrect password."
      );
    }

    const guestTodos = await findTodosById(userId);

    if (guestTodos.length > 0) {
      await updateTodosOwnerId(guestTodos, user.id);
    }

    const token = generateToken(user.username, user.id);

    return res
      .cookie("token", token, { httpOnly: true, secure: true })
      .status(HTTP_STATUS_CODES.OK)
      .json({ message: "Logged in." });
  } catch (error) {
    console.error(error);
    sendErrorResponse(
      res,
      HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      "Failed to authenticate user."
    );
  }
};

const logout = async (req, res) => {
  res.clearCookie("token");

  res.status(HTTP_STATUS_CODES.OK).send({ message: "Logged out successfully" });
};

module.exports = { register, login, logout };
