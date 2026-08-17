import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    address: {
      type: String,
      required: true,
    },

    items: [
      {
        food: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "foodItems",
          required: true,
        },
        qty: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],

    restaurantName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "restaurant",
    },
    phone: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["pending", "preparing", "cancelled", "reject", "delivered", "otw"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

const order = mongoose.model("orders", orderSchema);

export default order;
