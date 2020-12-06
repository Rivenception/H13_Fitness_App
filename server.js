const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitnessApp", { useNewUrlParser: true });

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const db = mongoose.connection;

db.on("error", error => {
  console.log("Database Error:", error);
});

const Workout = require("./models/model");

app.listen(3000, () => {
  console.log("App running on port 3000!");
});