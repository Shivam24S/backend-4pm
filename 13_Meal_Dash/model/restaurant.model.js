import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    restaurantName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    openingTime: {
      type: String,
      required: true,
    },
    closingTime: {
      type: String,
      required: true,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    restaurantImage: {
      type: String,
    },
    cloudinary_id: {
      type: String,
    },
    owner:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"user",
      required:true,
    },
      isVerified: {
      type: Boolean,
      default: false,
    },
 
  },
  {
    timestamps: true,
  },
);




const restaurantModel = mongoose.model("restaurant", restaurantSchema);

export default restaurantModel;
