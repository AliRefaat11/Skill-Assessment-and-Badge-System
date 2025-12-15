const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "config.env" });
const dbconnection = require("./Config/DB");

// Import routes
const badgeRoutes = require("./Routes/badgeRoutes");
const certificateRoutes = require("./Routes/certificateRoutes");

dbconnection();

const app = express();

app.use(express.json());

// Use routes
app.use("/api/badges", badgeRoutes);
app.use("/api/certificates", certificateRoutes);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.error("DB Error:", err));
