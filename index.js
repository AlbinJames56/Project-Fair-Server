require("dotenv").config(); //Loads .env file contents into process.env by default. I
const express = require("express");
const cors = require("cors");
const router = require("./Router/router");
const pfServer = express();
require('./DB/connection')

pfServer.use(cors());
pfServer.use(express.json())
pfServer.use(router);


const PORT = 3000;

pfServer.listen(PORT, () => {
  console.log("PF Server started on port " + PORT);
});

pfServer.get("/", (req, res) => {
  res
    .status(200)
    .send(
      "<h1 style=color:red>Project Fair server running and wait to client request</h1>"
    );
});
 