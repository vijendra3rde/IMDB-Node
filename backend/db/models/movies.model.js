const mongoose = require("mongoose");
const Movies = new mongoose.Schema(
  {
    name: {
        type: String,
        default : null,
    }, 
    year_of_release: {
        type: String,
        default : null,
     },
     plot:{
        type: String,
        default : null,
    },
    poster: {
        type: String,
        default : null,
    },
    actor_id: {
        type: String,
        default : null,
    },
    producer_id: {
        type: String,
        default : null,
    },
  },
  {
    timestamps: true
  }

);

const model = new mongoose.model("Movies", Movies);

module.exports = model;