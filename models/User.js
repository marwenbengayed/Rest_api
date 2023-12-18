import mongoose from "mongoose";

// User schema

const UserSchema = new mongoose.Schema({
   name: { type: String, required: true},
   age: { type: Number, required: true},
   profession: { type: String, default: "batal"},
});

// User model
const User = mongoose.model("user", UserSchema);

export default User;