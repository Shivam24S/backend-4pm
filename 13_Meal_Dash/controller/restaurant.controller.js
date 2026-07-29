import restaurantModel from "../model/restaurant.model.js";

import HttpError from "../middleware/HttpError.js";

const add = async (req, res, next) => {
  try {
    const {
      restaurantName,
      description,
      address,
      state,
      city,
      phone,
      openingTime,
      closingTime,
      isOpen,
    } = req.body;

    const newRestaurant = await restaurantModel.create({
      restaurantName,
      description,
      address,
      state,
      city,
      phone,
      openingTime,
      closingTime,
      isOpen,
      restaurantImage: req.file?.path || null,
      cloudinary_id: req.file?.filename || null,
      owner: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "restaurant added successfully",
      newRestaurant,
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const getAllRestaurant = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      isOpen,
      search,
      city,
      sort = "createdAt",
      order = "desc",
    } = req.query;

    // page = number(page);

    // limit = number(limit);

    const filter = {};

    if (search) {
      filter.restaurantName = {
        $regex: search,
        $options: "i",
      };
    }

    if (city) {
      filter.city = city;
    }

    if (isOpen !== undefined) {
      filter.isOpen = isOpen === "true";
    }

    // const sortOption = () => {
    //   [sort] = "asc" ? 1 : -1;
    // };

    const totalRestaurant = await restaurantModel.countDocuments(filter);

    const restaurants = await restaurantModel
      .find(filter)
      .populate("owner", "name email address -_id")
      .skip((page - 1) * limit)
      .lean();

    if (restaurants.length === 0) {
      res.status(404).json({ success: true, message: "restaurant not found" });
    }

    res.status(200).json({
      success: true,
      message: "restaurants founds",
      totalRestaurant: totalRestaurant,
      page: page,
      restaurants,
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

export default { add, getAllRestaurant };
