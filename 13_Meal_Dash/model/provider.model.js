import mongoose from "mongoose";

const providerSchema = new mongoose.Schema(
  {
    ownerName: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },

    restaurants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "restaurant",
      },
    ],

    documents: [
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
    bankAccNumber: {
      type: String,
      required: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const Provider = mongoose.model("provider", providerSchema);

export default Provider;
