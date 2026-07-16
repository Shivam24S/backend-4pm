import cloudinary from "../config/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "mealDash",
    allowed_formats: ["jpeg", "jpg", "png", "webp"],
    transformation: [
      { height: "800", width: "800", crop: "limit" },
      { fetch_format: "webp" },
      { quality: "auto" },
    ],
  },
});

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

export default upload;
