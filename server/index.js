require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const verifyToken = require("./middleware/verifyJWT");
const guestUser = require("./middleware/guestUser");

const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");
const corsOptions = require("./configs/corsOptions");

const app = express();
const PORT = 8000;

//Middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));
app.use(guestUser);
app.use(verifyToken);

//Routes
app.use("/", userRoutes);
app.use("/", todoRoutes);

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
