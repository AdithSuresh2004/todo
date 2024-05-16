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
          isGuest: true,
        },
      });
      const token = generateToken(username, anonymousUser.id, anonymousUser.isGuest);
      const expiryDate = new Date();
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
      res.cookie("token", token, { expires: expiryDate, sameSite: 'strict' });
      next();
    } else {
      next();
    }
  } catch (error) {
    console.error("Error registering guest user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = guestUser;