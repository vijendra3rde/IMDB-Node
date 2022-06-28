const mongoose = require("mongoose");
const Producers = new mongoose.Schema(
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

const model = new mongoose.model("Producers", Producers);

module.exports = model;