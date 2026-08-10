import User from "../model/user.model.js";

import HttpError from "../middleware/HttpError.js";

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

    res
      .status(200)
      .json({
        success: true,
        message: "user data fetched successfully",
        // totalCount,
        users,
      });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};





export default {getAllUsers}
