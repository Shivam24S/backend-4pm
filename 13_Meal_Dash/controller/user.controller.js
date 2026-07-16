import User from "../model/user.model.js";

import HttpError from "../middleware/HttpError.js";

const add = async (req, res, next) => {
  try {
    const { name, email, password, role, address, phone } = req.body;

    const newUser = {
      name,
      email,
      password,
      role,
      address,
      phone,
      profilePic: req.file ? req.file.path : null,
      cloudinary_id: req.file ? req.file.fileName : null
    };



    const alreadyUser = await User.findOne({ email });

    console.log("already user", alreadyUser);

    if (alreadyUser) {
      return next(new HttpError("user already exist with this email id"));
    }

    const user = new User(newUser);

    await user.save();

    res.status(201).json({ success: true, message: "new user added", user });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByCredential(email, password);

    if (!user) {
      return next(new HttpError("unable to login", 400));
    }

    const token = await user.generateAuthToken();

    console.log("login token", token);

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
  try {
    const user = req.user;

    if (!user) {
      return next(new HttpError("user not found", 404));
    }

    res
      .status(200)
      .json({ success: true, message: "user logged in successfully", user });
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
      .json({ success: true, message: "user logOut Successfully" });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const logOutAll = async (req, res, next) => {
  try {
    req.user.tokens = [];

    req.user.save();

    res.status(200).json({
      success: true,
      message: "user logout from all device successfully",
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = req.user;

    await user.deleteOne();

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

    const allowedFields = ["name", "address", "phone"];

    const isValid = updates.every((field) => allowedFields.includes(field));

    if (!isValid) {
      return next(new HttpError("only allowed field can be updated", 400));
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

const getAllUser = async function (req, res, next) {
  try {
    const users = await User.find();

    if (users.length === 0) {
      return next(new HttpError("no user data found"));
    }

    res
      .status(200)
      .json({
        success: true,
        message: "users data fetched successfully",
        total: users.length,
        users,
      });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

export default {
  add,
  login,
  authLogin,
  logOut,
  logOutAll,
  deleteUser,
  updateUser,
  getAllUser
};
