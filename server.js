const express = require("express");
const dotenv = require("dotenv");

dotenv.config({ path: "config.env" });
const ApiError = require("./Utils/apiError");
const dbconnection = require("./Config/DB");
const globalError = require("./middleware/errorMiddleware");

const userRoute = require("./Routes/userRoute");
const authRoute = require("./Routes/authRoute");
const learnerRoute = require("./Routes/learnerRoute");

const questionRoute = require("./routes/questionRoute");
const assessmentRoute = require("./routes/assesmentRoute");

dbconnection();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes FIRST
app.use("/api/v1/user", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/learner", learnerRoute);

app.all("/", (req, res, next) => {
  next(new ApiError(`can't find this route: ${req.originalUrl}`, 400));
});

app.use(globalError);

app.use("/api/v1/questions", questionRoute);
app.use("/api/v1/assessments", assessmentRoute);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});