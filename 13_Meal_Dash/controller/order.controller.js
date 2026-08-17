import food from "../model/food.model.js";
import order from "../model/order.model.js";

import HttpError from "../middleware/HttpError.js";

const placeOrder = async (req, res, next) => {
  try {
    const { address, items, restaurantName, phone } = req.body;

    const customerName = req.user._id;

    const foodIds = items.map((item) => item.food);

    console.log("food ids", foodIds);

    const foods = await food.find({
      _id: { $in: foodIds },
    });

    console.log("user selected food from db", foods);

    let totalAmount = 0;

    const orderItems = items.map((item) => {
      const foodFound = foods.find(
        (food) => food._id.toString() === item.food.toString(),
      );

      console.log("food found", foodFound);

      const itemsTotal = foodFound.price * item.qty;

      console.log("item total", itemsTotal);

      totalAmount += itemsTotal;

      return {
        food: foodFound._id,
        qty: item.qty,
      };
    });

    console.log("total amount", totalAmount);

    const newOrder = await order.create({
      address,
      items: orderItems,
      restaurantName,
      phone,
      customerName,
      totalAmount,
    });

    const orderPopulate = await newOrder.populate([
      { path: "customerName", select: "name email phone" },
      {
        path: "items.food",
        select: "name",
      },
      {
        path: "restaurantName",
        select: "restaurantName phone",
      },
    ]);

    res.status(201).json({
      success: true,
      message: "order placed successfully",
      order: orderPopulate,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

export default { placeOrder };
