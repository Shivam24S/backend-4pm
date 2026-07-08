import User from "../model/user.model.js";

import HttpError from "../middleware/HttpError.js";

const add = async (req, res, next) => {
  try {
    const { name, email, password, role, address } = req.body;

    const newUser = {
      name,
      email,
      password,
      role,
      address,
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

    res
      .status(200)
      .json({ success: true, message: "user logged in successfully", user });
  } catch (error) {
    console.log(error.message, 500);
  }
};

export default { add, login };
