import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
// import authRoutes from './routes/authRoutes.js';
// import taskRoutes from './routes/taskRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
// app.use('/auth', authRoutes);
// app.use('/tasks', taskRoutes);

// Database connection
const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@cluster0.ennn1mj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const options = {};

// Connection
mongoose
  .connect(uri, options)
  .then(() => console.log("Connection Successful"))
  .catch((err) => console.log("Connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
