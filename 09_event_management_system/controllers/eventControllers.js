import HttpError from "../middlewares/HttpError.js";

import Event from "../model/Event.js";

const create = async (req, res, next) => {
  try {
    const { eventName, eventDate, eventDescription, eventVenue, ticketPrice } =
      req.body;

    const eventImages =
      req.files?.eventImages?.map((file) => file.path) || null;
    const eventPoster = req.files?.eventPoster[0]?.path || null;
    const eventBanners = req.files?.eventBanners[0]?.path || null;
    const eventSpeakers =
      req.files?.eventSpeakers?.map((file) => file.path) || null;
    const eventDocuments =
      req.files?.eventDocuments?.map((file) => file.path) || null;

    if (!eventDate) {
      return next(new HttpError("event date is required", 400));
    }

    const newEventData = await Event.create({
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
    
    res.status(201).json({
      success: true,
      message: "new event added successfully",
      data: newEventData,
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

export default { create };
