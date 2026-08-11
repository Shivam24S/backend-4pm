
import mongoose from "mongoose";

const foodSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    restaurantName: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "restaurant",
    },
    providerName: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "provider",
    },
    isAvailable: {
      type: Boolean,
      default: true,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    preparingTime: {
      type: Number,
      min: 1,
      max: 30,
    },
    image: [
      {
        type: String,
        required: true,
      },
    ],
    cloudinary_id: [
      {
        type: String,
        required: true,
      },
    ],
    foodType: {
      type: String,
      required: true,
      enum: ["veg", "non-veg"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      // required:true,
      ref: "category",
    },
  },

  {
    timestamps: true,
  },
);

const food = mongoose.model("foodItems", foodSchema);

export default food;
