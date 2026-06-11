require("dotenv").config();
require("colors");

const express = require("express");
const cors = require("cors");
const dbConnect = require("./db.config");

const app = require("./app");

// Connect Database
dbConnect();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Task Management API Running");
});

const PORT = process.env.PORT || 4500;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});