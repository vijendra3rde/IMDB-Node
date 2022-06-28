const mongoose = require("mongoose");
const Actors = new mongoose.Schema(
  {
    name: {
        type: String,
        default : null,
    }, 
    gender: {
        type: String,
        default : null,
    },
    dob:{
        type: String,
        default : null,
    },
    bio: {
        type: String,
        default : null,
    },
  },
  {
    timestamps: true
  }

);

const model = new mongoose.model("Actors", Actors);

module.exports = model;