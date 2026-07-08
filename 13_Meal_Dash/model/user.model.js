import mongoose from "mongoose";
import bcrypt from "bcryptjs";


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
      unique: true,
    },
    password: {
      type: String,
      required: true,
      validate: (value) => {
        if (value.toLowerCase() === "password") {
          throw new Error("password can't be use as password");
        }
      },
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["customer", "admin", "provider"],
      default: "customer",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

userSchema.statics.findByCredential = async function (email, password) {
  try {
    const user = await this.findOne({ email });

    if (!user) {
      throw new Error("unable to login");
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      throw new Error("unable to login");
    }

    return user;
  } catch (error) {
    console.log(error);
  }
};

const User = mongoose.model("user", userSchema);

export default User;
