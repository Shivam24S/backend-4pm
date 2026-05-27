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

    cb(null, folderName);
  },
});
