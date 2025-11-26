const express = require("express");

dotenv.config({ path: "config.env" });
const dbconnection = require("./Config/DB");

dbconnection();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});