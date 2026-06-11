import User from "../model/User.js";

import HttpError from "../middleware/HttpError.js";

const add = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const newUser = new User({ name, email, password });

    await newUser.save();

    res
      .status(201)
      .json({ success: true, message: "user added successfully", newUser });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find();

    if (users.length === 0) {
      return next(new HttpError("no user data found", 404));
    }

    res.status(200).json({
      success: true,
      message: "all user data fetched successfully",
      users,
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByCredential(email, password);

    if (!user) {
      next(new HttpError("unable to login", 400));
    }

    res
      .status(200)
      .json({ success: true, message: "user logged in successfully", user });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

export default { add, getAllUser, login };
