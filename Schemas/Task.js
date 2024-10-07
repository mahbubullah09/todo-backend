import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    requeire: true,
    enum: ["pending", "ongoing", "complete"],
    default: "pending",
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Task", taskSchema);
