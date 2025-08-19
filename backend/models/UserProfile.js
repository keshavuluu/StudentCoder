const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  platformUsernames: {
    codechef: { type: String, required: true, trim: true },
    leetcode: { type: String, required: true, trim: true },
    gfg: { type: String, required: true, trim: true },
    interviewbit: { type: String, required: true, trim: true },
    codeforces: { type: String, required: true, trim: true },
  },
  scores: {
    codechef: { type: Number, default: 0 },
    leetcode: { type: Number, default: 0 },
    gfg: { type: Number, default: 0 },
    interviewbit: { type: Number, default: 0 },
    codeforces: { type: Number, default: 0 },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

userProfileSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("UserProfile", userProfileSchema);
