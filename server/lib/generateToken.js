const jwt = require("jsonwebtoken");

const generateToken = (username, id, isGuest) => {
  const secretKey = process.env.ACCESS_SECRET_TOKEN;

  const token = jwt.sign(
    {
      username: username,
      userId: id,
      guest: isGuest || false
    },
    secretKey
  );

  return token;
};

module.exports = generateToken;
