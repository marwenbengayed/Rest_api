import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

// configure the .env file path
dotenv.config({ path: "./config/.env" });

// Set Up the Database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// create new instants from express
const app = express();

// applay midlware
app.use(express.json());

// GET :  RETURN ALL USERS
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST :  ADD A NEW USER TO THE DATABASE
app.post("/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT : EDIT A USER BY ID
app.put("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const profession = req.body.prof;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profession: profession },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE : REMOVE A USER BY ID
app.delete("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);

    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// create a listener for port
app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
})