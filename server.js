const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "config.env" });
const dbconnection = require("./Config/DB");

const badgeRoute = require('./Routes/badgeRoute');
const skillRoute = require('./Routes/skillRoute');

dbconnection();

const app = express();

app.use(express.json());

app.use('/api/v1/badges', badgeRoute);
app.use('/api/v1/skills', skillRoute);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

mongoose.connect(process.env.DB_URI)
.then(() => console.log("Database Connected"))
.catch(err => console.error("DB Error:", err));