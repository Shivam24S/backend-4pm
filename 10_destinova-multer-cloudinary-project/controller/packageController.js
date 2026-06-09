import Packages from "../model/Packages.js";
import HttpError from "../middlewares/HttpError.js";
import cloudinary from "../config/cloudinary.js";

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

    if (!req.file) {
      return next(new HttpError("Package image is required"));
    }

    const newPackage = new Packages({
      packageName,
      price,
      startDate,
      endDate,
      duration,
      destination,
      packageType,
      packageImage: req.file.path,
      cloudinary_id: req.file.filename,
    });

    await newPackage.save();

    res
      .status(201)
      .json({ success: true, message: "new package added", newPackage });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const getAllPackages = async (req, res, next) => {
  try {
    const packages = await Packages.find();

    if (packages.length === 0) {
      return next(new HttpError("no package data found", 404));
    }

    res.status(200).json({
      success: true,
      total: packages.length,
      message: "all packages data fetched successfully",
      packages,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const packageById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const TravelPackage = await Packages.findById(id);

    if (!TravelPackage) {
      return next(new HttpError("package not found with this id", 404));
    }

    res
      .status(200)
      .json({ success: true, message: "package found", TravelPackage });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const deletePackage = async (req, res, next) => {
  try {
    const id = req.params.id;

    const packageDelete = await Packages.findById(id);

    if (!packageDelete) {
      return next(new HttpError("failed to delete this package", 400));
    }

    await cloudinary.uploader.destroy(packageDelete.cloudinary_id);

    await packageDelete.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "package delete successfully" });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const updatePackageDetail = async (req, res, next) => {
  try {
    const id = req.params.id;

    const TravelPackage = await Packages.findById(id);

    if (!TravelPackage) {
      return next(new HttpError("package not found", 404));
    }

    const updates = Object.keys(req.body);

    const allowedFields = [
      "packageName",
      "price",
      "startDate",
      "endDate",
      "duration",
      "destination",
      "packageType",
    ];

    const isValidUpdates = updates.every((field) =>
      allowedFields.includes(field),
    );

    if (!isValidUpdates) {
      return next(new HttpError("only allowed field can be updated", 500));
    }

    updates.forEach((update) => {
      TravelPackage[update] = req.body[update];
    });

    if (req.file) {
      await cloudinary.uploader.destroy(TravelPackage.cloudinary_id);

      TravelPackage.packageImage = req.file.path;
      TravelPackage.cloudinary_id = req.file.filename;
    }

    await TravelPackage.save();

    res.status(200).json({
      success: true,
      message: "package data updated successfully",
      TravelPackage,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

export default {
  add,
  getAllPackages,
  packageById,
  deletePackage,
  updatePackageDetail,
  
};
