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

    const token = await user.generateAuthToken();

    console.log("token1111", token);

    res.status(200).json({
      success: true,
      message: "user logged in successfully",
      user,
      token,
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const authLogin = async (req, res, next) => {
  const user = req.user;

  res
    .status(200)
    .json({ success: true, message: "auth login successfully", user });
};

const deleteUser = async (req, res, next) => {
  try {
    const user = req.user;

    await User.deleteOne(user);

    res
      .status(200)
      .json({ success: true, message: "user deleted successfully" });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = req.user;

    const updates = Object.keys(req.body);

    const allowedField = ["name", "password"];

    const isValidUpdates = updates.every((field) =>
      allowedField.includes(field),
    );

    if (!isValidUpdates) {
      return next(new HttpError("only allowed field can be update", 400));
    }

    updates.forEach((update) => {
      user[update] = req.body[update];
    });

    await user.save();

    res
      .status(200)
      .json({ success: true, message: "user data updated successfully", user });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const logOut = async (req, res, next) => {
  try {
    req.user.tokens = req.user.tokens.filter((t) => t.token != req.token);

    await req.user.save();

    res
      .status(200)
      .json({ success: true, message: "user log out successfully" });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const logOutAll = async (req, res, next) => {
  try {
    req.user.tokens = [];

    await req.user.save();

    res
      .status(200)
      .json({ success: true, message: "user logOut from all device" });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

export default {
  add,
  getAllUser,
  login,
  authLogin,
  deleteUser,
  updateUser,
  logOut,
  logOutAll
};
