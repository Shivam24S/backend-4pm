import User from "../model/user.model.js";

import HttpError from "../middleware/HttpError.js";
import Provider from "../model/provider.model.js";

const registerAsProvider = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);

    // const existingProvider = await Provider.find({ ownerName: userId });

    // if (existingProvider) {
    //   return next(
    //     new HttpError("this account is already registered as provider", 400),
    //   );
    // }

    const { restaurants, bankAccNumber } = req.body;

    const newProvider = await new Provider({
      ownerName: req.user._id,
      restaurants,
      bankAccNumber,
      documents: req.files.map((file) => file.path),
      cloudinary_id: req.files.map((file) => file.filename),
    });

    user.role = "provider";

    await newProvider.save();

    await user.save();

    res.status(201).json({
      success: true,
      message: "provider register please wait for admin approval",
      newProvider,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};




export default { registerAsProvider };
