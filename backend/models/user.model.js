import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    enum: ["employee", "hr"],
    required: true,
  },
  department: {
    type: String,
    required: false,
  },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
