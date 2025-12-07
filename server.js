const express = require("express");
const dotenv = require("dotenv");

dotenv.config({ path: "config.env" });
const ApiError = require("./Utils/apiError");
const dbconnection = require("./Config/DB");
const globalError = require("./middleware/errorMiddleware");

const userRoutes = require("./Routes/userRoute");
const authRoute = require("./Routes/authRoute");

dbconnection();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes FIRST
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/auth", authRoute);

// Handle invalid routes LAST (use '/' instead of '*')
app.all("/", (req, res, next) => {
  next(new ApiError(`can't find this route: ${req.originalUrl}`, 400));
});

app.use(globalError);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});