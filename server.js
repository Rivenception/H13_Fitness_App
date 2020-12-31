const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require('path');
const db = require("./models");

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
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

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "public/exercise.html"));
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "public/stats.html"));
});

app.get('/api/workouts', (req, res) => {
  db.Workout.find({})
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.status(400).json(err);
  });
});

app.post('/api/workouts', (req, res) => {
  db.Workout.create(req.body)
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.status(400).json(err);
  });
});

app.put('/api/workouts/:id', (req, res) => {
  db.Workout.findByIdAndUpdate(
    req.params.id,
    // push to model array the req.body
    { $push: {exercises: req.body}},
    // syntax needed according to mongoose doc to return objectt after update is applied
    { new: true }
  )
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.status(400).json(err);
  });
});

app.get('/api/workouts/range', (req,res) => { 
  db.Workout.find({})
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.status(400).json(err);
  });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});