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

export default { add };
