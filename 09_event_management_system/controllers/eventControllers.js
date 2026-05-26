import HttpError from "../middlewares/HttpError.js";

import Event from "../model/Event.js";

const create = async (req, res, next) => {
  try {
    const { eventName, eventDate, eventDescription, eventVenue, ticketPrice } =
      req.body;

    const eventImages = req.files?.req.files.map((file) => file.path) || null;
    const eventPoster = req.files?.req.files[0].path || null;
    const eventBanners = req.files?.req.files[0].path || null;
    const eventSpeakers = req.files?.req.files.map((file) => file.path) || null;
    const eventDocuments =
      req.files?.req.files.map((file) => file.path) || null;

    if (!eventDate) {
      return next(new HttpError("event date is required", 400));
    }

    const newEvent = await new Event({
      eventName,
      eventDate,
      eventDescription,
      eventVenue,
      ticketPrice,
      eventImages,
      eventPoster,
      eventBanners,
      eventSpeakers,
      eventDocuments,
    });

    await newEvent.save();

    res
      .status(201)
      .json({
        success: true,
        message: "new event added successfully",
        newEvent,
      });
  } catch (error) {}
};

export default { create };
