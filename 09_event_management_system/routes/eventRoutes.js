import express from "express";

import uploads from "../middlewares/uploads.js";
import eventControllers from "../controllers/eventControllers.js";

const router = express.Router();

router.post(
  "/create",
  uploads.fields([
    { name: "eventImages", maxCount: 5 },
    { name: "eventPoster", maxCount: 1 },
    {
      name: "eventBanners",
      maxCount: 1,
    },
    {
      name: "eventSpeakers",
      maxCount: 3,
    },
    {
      name: "eventDocuments",
      maxCount: 3,
    },
  ]),
  eventControllers.create,
);

router.get("/allEvents", eventControllers.getAllEvents);

router.get("/:id", eventControllers.eventById);

router.delete("/:id",eventControllers.deleteEvent)

export default router;

// multer uploads configuration as per need

// single

// uploads.single("avatar")

// multiple but same name

// uploads.array("eventImages", 5);

// multiple but different different file

// uploads.fields([
//   { name: "eventImages", maxCount: 5 },
//   { name: "eventPoster", maxCount: 1 },
// ]);

// tamne game e type

// uploads.any()

// none

// uploads.none();
