import Packages from "../model/Packages.js";
import HttpError from "../middlewares/HttpError.js";

const add = async (req, res, next) => {
  try {
    const {
      packageName,
      price,
      startDate,
      endDate,
      duration,
      destination,
      packageType,
    } = req.body;

    console.log(
      packageName,
      price,
      startDate,
      endDate,
      duration,
      destination,
      packageType,
    );

    if (
      !packageName ||
      !price ||
      !startDate ||
      !endDate ||
      !duration ||
      !destination ||
      !packageType
    ) {
      return next(new HttpError("all the fields are required"));
    }

    const packageImage = req.file.path;

    console.log("package image", packageImage);

    const newPackage = new Packages({
      packageName,
      price,
      startDate,
      endDate,
      duration,
      destination,
      packageType,
      packageImage: req.file.path,
    });

    await newPackage.save();

    res
      .status(201)
      .json({ success: true, message: "new package added", newPackage });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

export default { add };
