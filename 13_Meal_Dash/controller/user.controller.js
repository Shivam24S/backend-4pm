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

    res
      .status(200)
      .json({
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

export default { add, login, authLogin };
