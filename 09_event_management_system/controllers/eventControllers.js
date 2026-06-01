import HttpError from "../middlewares/HttpError.js";

import Event from "../model/Event.js";
import fs from "fs";

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

const getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find({});

    if (events.length === 0) {
      return res
        .status(404)
        .json({ success: true, message: "no event data found", data: null });
    }

    res.status(200).json({
      success: true,
      message: "all event data fetched successfully",
      total: events.length,
      data: events,
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const eventById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);

    console.log("event", event);

    if (!event) {
      return next(new HttpError("no event data found with this id", 404));
    }

    res
      .status(200)
      .json({ success: true, message: "event data found", data: event });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleteEvent = await Event.findByIdAndDelete(id);
    if (!deleteEvent) {
      return next(new HttpError("failed to delete event", 400));
    }

    const filesToDelete = [
      ...deleteEvent.eventImages,
      deleteEvent.eventPoster,
      deleteEvent.eventBanners,
      ...deleteEvent.eventSpeakers,
      ...deleteEvent.eventDocuments,
    ];

    filesToDelete.forEach((file) => {
      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
      } else {
        return next(new HttpError("failed to delete file"));
      }
    });

    return res.status(200).json({ success: true, message: "event deleted" });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const updateEvent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);

    console.log("update event", event);

    if (!event) {
      return next(new HttpError("no event data found with this id", 404));
    }

    const updates = Object.keys(req.body);

    const allowedFields = [
      "eventName",
      "eventDate",
      "eventDescription",
      "eventVenue",
      "ticketPrice",
    ];

    const isValidUpdates = updates.every((field) =>
      allowedFields.includes(field),
    );

    if (!isValidUpdates) {
      return next(new HttpError("only allowed field can be updated", 400));
    }

    if (req.files?.eventImages) {
      event.eventImages.forEach((file) => {
        if (fs.existsSync(file)) {
          fs.unlinkSync(file);
        }
      });

      event.eventImages =
        req.files?.eventImages?.map((file) => file.path) || null;
    }

    updates.forEach((update) => {
      event[update] = req.body[update];
    });

    await event.save();

    res.status(200).json({
      success: true,
      message: "event data updated successfully",
      event,
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

export default { create, getAllEvents, eventById, deleteEvent, updateEvent };
