import User from "../model/user.model.js";

import HttpError from "../middleware/HttpError.js";
import restaurantModel from "../model/restaurant.model.js";
import food from "../model/food.model.js";
import order from "../model/order.model.js";

const getAllUsers = async (req, res, next) => {
  try {
    const { role, isVerified } = req.query;

    const query = {};

    if (role === "customer") {
      query.role = "customer";
    }

    if (role === "provider") {
      query.role = "provider";
    }

    if (isVerified !== undefined) {
      query.isVerified = isVerified === "true";
    }

    const users = await User.find(query);

    if (users.length === 0) {
      return next(new HttpError("no user data found", 404));
    }

    // const totalCount =  await users.countDocument(query);

    res.status(200).json({
      success: true,
      message: "user data fetched successfully",
      // totalCount,
      users,
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const dashBoardStatics = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalCustomer = await User.countDocuments({ role: "customer" });

    const totalApprovedProvider = await User.countDocuments({
      role: "provider",
      isVerified: true,
    });

    const totalPendingProvider = await User.countDocuments({
      role: "provider",
      isVerified: false,
    });

    const totalRestaurant = await restaurantModel.countDocuments();

    const totalApprovedRestaurant = await restaurantModel.countDocuments({
      isVerified: true,
    });

    const totalPendingRestaurant = await restaurantModel.countDocuments({
      isVerified: false,
    });

    const totalFoodItems = await food.countDocuments();

    const totalApprovedFoodItems = await food.countDocuments({
      isVerified: true,
    });

    const totalPendingFoodItems = await food.countDocuments({
      isVerified: false,
    });

    const totalBookings = await order.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const totalRevenue = await order.aggregate([
      {
        $match: {
          status: "delivered",
        },
      },
      {
        $group: {
          _id: null,
          revenue: { $sum: "$totalAmount" },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "dashboard data fetched successfully",
      totalBookings,
      totalRevenue,
      totalPendingFoodItems,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

export default { getAllUsers, dashBoardStatics };
