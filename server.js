const express = require("express");
const dotenv = require("dotenv");
const path = require('path');
const cookieParser = require('cookie-parser');

dotenv.config({ path: "config.env" });
const ApiError = require("./Utils/apiError");
const dbconnection = require("./Config/DB");
const globalError = require("./middleware/errorMiddleware");

const userRoute = require("./Routes/userRoute");
const authRoute = require("./Routes/authRoute");
const learnerRoute = require("./Routes/learnerRoute");
const questionRoute = require("./Routes/questionRoute");
const assessmentRoute = require("./Routes/assesmentRoute");
const skillRoute = require('./Routes/skillRoute');
const badgeRoutes = require("./Routes/badgeRoutes");
const authservice = require('./Services/authService');

dbconnection();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'View'));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/learner", learnerRoute);
app.use("/api/v1/questions", questionRoute);
app.use("/api/v1/assessments", assessmentRoute);
app.use("/api/v1/badges", badgeRoutes);
app.use('/api/v1/skills', skillRoute);
app.get('/api/v1/auth', authservice.renderAuth);

app.all("/", (req, res, next) => {
  next(new ApiError(`can't find this route: ${req.originalUrl}`, 400));
});


app.use(globalError);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
