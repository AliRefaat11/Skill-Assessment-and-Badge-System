const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require('cookie-parser');

dotenv.config({ path: "config.env" });

const ApiError = require("./Utils/apiError");
const dbconnection = require("./Config/DB");
const globalError = require("./middleware/errorMiddleware");

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "View"));

app.use("/assets", express.static(path.join(__dirname, "View/assets")));
app.use(express.static(path.join(__dirname, "public")));

const userRoute = require("./Routes/userRoute");
const authRoute = require("./Routes/authRoute");
const learnerRoute = require("./Routes/learnerRoute");
const assesmentRoute = require("./Routes/assesmentRoute");
const questionRoute = require("./Routes/questionRoute");
const badgeRoute = require("./Routes/badgeRoute");
const skillRoute = require('./Routes/skillRoute');
const learnerBadgeRoute = require('./Routes/learnerBadgeRoute');
const learnerSkillRoute = require('./Routes/learnerSkillRoute');
const adminRoutes = require("./Routes/adminRoutes");

dbconnection();

app.use("/api/v1/user", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/learner", learnerRoute);
app.use("/api/v1/assessments", assesmentRoute);
app.use("/api/v1/questions", questionRoute);
app.use('/api/v1/badges', badgeRoute);
app.use('/api/v1/skills', skillRoute);
app.use('/api/v1/learnerBadges', learnerBadgeRoute);
app.use('/api/v1/learnerSkills', learnerSkillRoute);
// Admin API routes
app.use('/api/admin/skills', skillRoute);
app.use('/api/admin/assessments', assesmentRoute);
app.use('/api/admin/questions', questionRoute);
app.use('/api/admin/users', userRoute);

// Admin API routes
const { auth, allowedTo } = require('./Services/authService');
const User = require("./Models/userModel");
const Skill = require("./Models/skillModel");
const Assessment = require("./Models/assesmentModel");
const Learner = require("./Models/learnerModel");

async function buildStats() {
  const [totalUsers, totalSkills, totalQuizzes, activeUsers] = await Promise.all([
    User.countDocuments(),
    Skill.countDocuments(),
    Assessment.countDocuments(),
    Learner.countDocuments()
  ]);

  return { totalUsers, totalSkills, totalQuizzes, activeUsers };
}

app.get('/api/admin/stats', async (req, res) => {
  try {
    const stats = await buildStats();
    res.json({ success: true, data: stats });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.use(adminRoutes);

app.all("/", (req, res, next) => {
  next(new ApiError(`can't find this route: ${req.originalUrl}`, 400));
});

app.use(globalError);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});