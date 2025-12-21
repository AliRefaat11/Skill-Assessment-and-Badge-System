const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require('cookie-parser');

dotenv.config({ path: "config.env" });

const ApiError = require("./Utils/apiError");
const dbconnection = require("./Config/DB");
const globalError = require("./middleware/errorMiddleware");

const userRoute = require("./Routes/userRoute");
const authRoute = require("./Routes/authRoute");
const learnerRoute = require("./Routes/learnerRoute");
const instructorRoute = require("./Routes/instructorRoute")
const courseRoute = require("./Routes/courseRoute");
const questionRoute = require("./Routes/questionRoute");
const assessmentRoute = require("./Routes/assesmentRoute");
const badgeRoute = require('./Routes/badgeRoute');
const skillRoute = require('./Routes/skillRoute');
const adminRoutes = require("./Routes/adminRoutes");

dbconnection();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "View")); 
app.use("/assets", express.static(path.join(__dirname, "View/assets")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/learner", learnerRoute);
app.use("/api/v1/instructor", instructorRoute);
app.use("/api/v1/question", questionRoute);
app.use("/api/v1/assessment", assessmentRoute);
app.use("/api/v1/badge", badgeRoute);
app.use('/api/v1/skill', skillRoute);
app.use("/api/v1/courses", courseRoute);

app.use(adminRoutes);

app.all("/", (req, res, next) => {
  next(new ApiError(`can't find this route: ${req.originalUrl}`, 400));
});

app.use(globalError);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
