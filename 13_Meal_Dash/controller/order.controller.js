import Order from "../models/order.model.js";
import Food from "../models/food.model.js";

export const createOrder = async (req, res, next) => {
  try {
    const { restaurant, items } = req.body;

    const customer = req.user.id;

    const foodIds = items.map((item) => item.food);

    const foods = await Food.find({
      _id: { $in: foodIds },
    });

    let totalAmount = 0;

    const orderItems = items.map((item) => {
      const food = foods.find(
        (food) => food._id.toString() === item.food.toString(),
      );

      const itemTotal = food.price * item.quantity;

      totalAmount += itemTotal;

      return {
        food: food._id,
        quantity: item.quantity,
      };
    });

    const order = await Order.create({
      customer,
      restaurant,
      items: orderItems,
      totalAmount,
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    next(error);
  }
};
