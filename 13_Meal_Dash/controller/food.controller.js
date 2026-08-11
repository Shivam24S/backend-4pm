import food from "../model/food.model.js";
import HttpError from "../middleware/HttpError.js";

const add = async (req, res, next) => {
  try {
    const {
      name,
      price,
      description,
      restaurantName,
      providerName,
      isAvailable,
      preparingTime,
      foodType,
      category,
    } = req.body;

    const newFood = await food.create({
      name,
      price,
      description,
      restaurantName,
      providerName,
      isAvailable,
      preparingTime,
      foodType,
      category,
      image: req.files.map((file) => file.path),
      cloudinary_id: req.files.map((file) => file.filename),
    });

    res.status(201).json({
      success: true,
      message: "new food item added wait for admin approval",
      newFood,
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};



export default {add}