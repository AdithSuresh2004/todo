const jwt = require("jsonwebtoken");

const generateToken = (username, id) => {
  const secretKey = process.env.ACCESS_SECRET_TOKEN;

  const token = jwt.sign(
    {
      username: username,
      userId: id,
    },
    secretKey
  );

  return token;
};

module.exports = generateToken;
