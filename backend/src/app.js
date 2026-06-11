const express = require("express");
const cors = require("cors");

const app = express();
const morgan =require("morgan")

app.use(cors());
app.use(morgan("dev"))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", require("./routes"));

module.exports = app;