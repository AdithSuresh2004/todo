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
  return await prisma.todo.findMany({
    where: { ownerId: id },
  });
};

const updateTodosOwnerId = async (todos, newOwnerId) => {
  await prisma.todo.updateMany({
    where: { id: { in: todos.map((todo) => todo.id) } },
    data: { ownerId: newOwnerId },
  });
};

const register = async (req, res) => {
  const { username, password } = req.body;
  const validationError = validateUserInput({ username, password });

  if (validationError) {
    return sendErrorResponse(
      res,
      HTTP_STATUS_CODES.BAD_REQUEST,
      validationError
    );
  }

  const existingUser = await findUserByUsername(username);

  if (existingUser) {
    return sendErrorResponse(
      res,
      HTTP_STATUS_CODES.CONFLICT,
      "Username is already in use."
    );
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { username, password: hashedPassword },
    });

    res.status(HTTP_STATUS_CODES.CREATED).json({ user: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    sendErrorResponse(
      res,
      HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      "Failed to register user."
    );
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const { userId } = req.user || {};
  const validationError = validateUserInput({ username, password });

  if (validationError) {
    return sendErrorResponse(
      res,
      HTTP_STATUS_CODES.BAD_REQUEST,
      validationError
    );
  }

  try {
    const user = await findUserByUsername(username);

    if (!user) {
      return sendErrorResponse(
        res,
        HTTP_STATUS_CODES.UNAUTHORIZED,
        "Invalid credentials."
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return sendErrorResponse(
        res,
        HTTP_STATUS_CODES.UNAUTHORIZED,
        "Invalid credentials."
      );
    }

    if (userId) {
      const guestTodos = await findTodosById(userId);
      if (guestTodos.length > 0) {
        await updateTodosOwnerId(guestTodos, user.id);
      }
    }

    const token = generateToken(user.username, user.id, user.isGuest);
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    res
      .cookie("token", token, { expires: expiryDate, sameSite: "strict" })
      .status(HTTP_STATUS_CODES.OK)
      .json({ message: "Logged in successfully." });
  } catch (error) {
    console.error("Error authenticating user:", error);
    sendErrorResponse(
      res,
      HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      "Failed to authenticate user."
    );
  }
};

const logout = async (req, res) => {
  res.clearCookie("token");
  res
    .status(HTTP_STATUS_CODES.OK)
    .json({ message: "Logged out successfully." });
};

module.exports = { register, login, logout };
