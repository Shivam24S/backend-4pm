import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folderName = "uploads/";

    if (file.fieldname === "eventImages") {
      folderName += "eventImages";
    } else if (file.fieldname === "eventPoster") {
      folderName += "eventPoster";
    } else if (file.fieldname === "eventBanners") {
      folderName += "eventBanners";
    } else if (file.fieldname === "eventSpeakers") {
      folderName += "eventSpeakers";
    } else if (file.fieldname === "eventDocuments") {
      folderName += "eventDocuments";
    } else {
      folderName = "others";
    }

    fs.mkdirSync(folderName, { recursive: true });

    return cb(null, folderName);
  },

  filename: (req, file, cb) => {
    const uniqueName = `${file.fieldname}-${Date.now()}-${file.originalname}`;

    return cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const imagesTypes = ["image/jpg", "image/jpeg", "image/png"];

  const documentTypes = ["application/pdf"];

  if (file.fieldname === "eventDocuments") {
    if (documentTypes.includes(file.mimetype)) {
      return cb(null, true);
    } else {
      cb(new Error("only pdf format is allowed"));
    }
  } else {
    if (imagesTypes.includes(file.mimetype)) {
      return cb(null, true);
    } else {
      cb(new Error("only jpg,jpeg or png format is allowed"));
    }
  }
};

const uploads = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export default uploads;



