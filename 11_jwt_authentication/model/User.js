import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      validate: (value) => {
        if (value.toLowerCase() === "password") {
          return "password can't contain password word as password";
        }
      },
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("user", userSchema);

export default User;
