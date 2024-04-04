const prisma = require("../lib/db");
const { nanoid } = require("nanoid");
const generateToken = require("../lib/generateToken");

const guestUser = async (req, res, next) => {
  try {
    if (!req.cookies.token) {
      const username = `guest_${nanoid(6)}`;
      const password = nanoid(6);

      const anonymousUser = await prisma.user.create({
        data: {
          username,
          password,
        },
      });

      const token = generateToken(username, anonymousUser.id);

      res.cookie("token", token, { httpOnly: true, secure: true });

      next();
    } else {
      next();
    }
  } catch (error) {
    console.error("Error registering guest user:", error);
    // If an error occurs, send an internal server error response
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = guestUser;
