import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


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
    profilePic: {
      type: String,
    },
    cloudinary_id: {
      type: String,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
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

userSchema.methods.generateAuthToken = async function () {
  try {
    const user = this;

    const token = jwt.sign(
      {
        _id: user._id.toString(),
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    user.tokens = user.tokens.concat({ token });

    await user.save();

    return token;
  } catch (error) {
    console.log(error.message);
  }
};

userSchema.virtual("restaurant",{
  ref:"restaurant",
  localField:"_id",
  foreignField:"owner"
})


userSchema.methods.toJSON = function () {
  const user = this;

  const userObject = user.toObject();

  delete userObject.password;

  delete userObject._id;

  delete userObject.tokens;

  delete userObject.createdAt;

  delete userObject.updatedAt;

  delete userObject.__v;

  return userObject;
};

const User = mongoose.model("user", userSchema);

export default User;
