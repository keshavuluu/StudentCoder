const mongoose = require("mongoose");

const hackathonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  collegeName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  isPaid: {
    type: Boolean,
    required: true,
  },
  feeAmount: {
    type: Number,
    required: function () {
      return this.isPaid === true;
    },
  },
  feeType: {
    type: String,
    enum: ["per_team", "per_person"],
    required: function () {
      return this.isPaid === true;
    },
  },
  maxTeamSize: {
    type: Number,
    required: true,
  },
  lastDate: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Hackathon", hackathonSchema);
