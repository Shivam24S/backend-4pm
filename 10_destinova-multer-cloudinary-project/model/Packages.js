import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    packageName: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    packageImages: {
      type: String,
      required: true,
    },
    packageType: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Packages = mongoose.model("Packages", packageSchema);

export default Packages;
