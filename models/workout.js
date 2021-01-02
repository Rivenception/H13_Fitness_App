const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now,
    },
    exercises: [{
        type:{
            type: String,
            trim: true,
            required: true,
        },
        name:{
            type: String,
            trim: true,
            required: true,
        },
        duration:{
            type: Number,
            required: true,
        },
        weight:{
            type: Number,
        },
        reps:{
            type: Number,
            required: true,
        },
        sets:{
            type: Number,
            required: true,
        },
        distance:{
            type: Number,
            required: true,
        },
    }],
},
{
    toJSON: {
      virtuals: true,
    },
})

WorkoutSchema.virtual("totalDuration").get(function () {
    const reducer = (accumulator, currentValue) => accumulator + currentValue.duration;
    const totalDuration = this.exercises.reduce(reducer,0);
    return totalDuration;
  });

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;