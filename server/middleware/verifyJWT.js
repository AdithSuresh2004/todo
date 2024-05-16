const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"] || req.query.token || req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Token not set yet" });
  }

  jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Failed to authenticate token" });
    }

    req.user = decoded;

    next();
  });
};

module.exports = verifyToken;
