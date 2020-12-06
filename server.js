const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require('path');
const db = require("./models");

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitnessApp", {
  useNewUrlParser: true,
});

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const dbconnection = mongoose.connection;

dbconnection.on("error", (error) => {
  console.log("Database Error:", error);
});

//HTML Routes
app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "exercise.html"));
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "stats.html"));
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
