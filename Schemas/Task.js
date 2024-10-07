const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, 
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true, 
    enum: ["pending", "ongoing", "complete"],
    default: "pending",
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now, // removed parentheses to use the function instead of calling it
  },
});

module.exports = mongoose.model("Task", taskSchema);
