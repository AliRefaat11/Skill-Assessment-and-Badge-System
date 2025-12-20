const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: "config.env" });

const ApiError = require("./Utils/apiError");
const dbconnection = require("./Config/DB");
const globalError = require("./middleware/errorMiddleware");

const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const learnerRoute = require("./routes/learnerRoute");
const courseRoute = require("./routes/courseRoute");

const questionRoute = require("./routes/questionRoute");
const assessmentRoute = require("./routes/assesmentRoute");

const badgeRoute = require('./routes/badgeRoute');
const skillRoute = require('./routes/skillRoute');

const adminRoutes = require("./routes/adminRoutes");

dbconnection();

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "View")); // because your folder is named View
app.use("/assets", express.static(path.join(__dirname, "View/assets")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));




app.use("/api/v1/user", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/learner", learnerRoute);
app.use("/api/v1/courses", courseRoute);

app.use("/api/v1/questions", questionRoute);
app.use("/api/v1/assessments", assessmentRoute);

app.use('/api/v1/badges', badgeRoute);
app.use('/api/v1/skills', skillRoute);

// Admin pages (EJS)
app.use(adminRoutes);

// Not Found Route
app.use((req, res, next) => {
  next(new ApiError(`can't find this route: ${req.originalUrl}`, 400));
});



// Global Error Handler
app.use(globalError);


const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
