import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    enum: [
      "punjabi",
      "north-indian",
      "south-indian",
      "gujarati",
      "rajasthani",
      "bengali",
      "chinese",
      "italian",
      "mexican",
      "fast-food",
      "street-food",
      "biryani",
      "pizza",
      "burger",
      "sandwich",
      "rolls-wraps",
      "momos",
      "noodles",
      "thali",
      "snacks",
      "desserts",
      "bakery",
      "beverages",
      "ice-cream",
      "healthy-food",
      "salads",
      "seafood",
      "cafe",
      "breakfast",
    ],
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  },
});

const foodCategories = mongoose.model("category", categorySchema);

export default foodCategories;
