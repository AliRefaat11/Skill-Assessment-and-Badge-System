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

const badgeRoute = require('./Routes/badgeRoute');
const skillRoute = require('./Routes/skillRoute');

// Import routes
const badgeRoutes = require("./Routes/badgeRoutes");
const certificateRoutes = require("./Routes/certificateRoutes");

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

app.use('/api/v1/badges', badgeRoute);
app.use('/api/v1/skills', skillRoute);

// Use routes
app.use("/api/badges", badgeRoutes);
app.use("/api/certificates", certificateRoutes);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
