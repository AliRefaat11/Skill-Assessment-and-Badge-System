const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "config.env" });
const dbconnection = require("./Config/DB");

dbconnection();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

mongoose.connect(process.env.DB_URI)
.then(() => console.log("Database Connected"))
.catch(err => console.error("DB Error:", err));