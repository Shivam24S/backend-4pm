import cloudinary from "../config/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "mealDash",
//     allowed_formats: ["jpeg", "jpg", "png", "webp"],
//     transformation: [
// { height: "800", width: "800", crop: "limit" },
// { fetch_format: "webp" },
// { quality: "auto" },
//     ],
//   },
// });

// const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// export default upload;

const createUploads = ({
  folder,
  transformation = [],
  resource_type = "auto",
  fileSize = 1024 * 1024 * 5,
  allowed_formats = [],
  mimetype = [],
}) => {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
      return {
        folder,
        transformation,
        allowed_formats,
        resource_type,
      };
    },
  });

  return multer({
    storage,
    limits: { fileSize },
    fileFilter: (req, file, cb) => {
      if (mimetype.length && !mimetype.includes(file.mimetype)) {
      return  cb(
          new Error(`invalid file type, Allowed types: ${mimetype.join(", ")} `),
          false,
        );
      } else {
        cb(null, true);
      }
    },
  });
};

export const profilePic = createUploads({
  folder: "mealDash/profilePic",
  transformation: [
    { height: "800", width: "800", crop: "limit" },
    { fetch_format: "webp" },
    { quality: "auto" },
  ],
  allowed_formats: ["jpeg", "jpg", "png", "webp"],
  mimetype: ["image/jpeg", "image/png", "image/jpg"],
});
