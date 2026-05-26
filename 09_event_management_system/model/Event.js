import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
      trim: true,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    eventDescription: String,
    eventImages: {
      type: [String],
    },
    eventPoster: {
      type: String,
      required: true,
    },
    eventBanners: String,
    eventVenue: { type: String, required: true },
    eventSpeakers: {
      type: [String],
    },
    ticketPrice: {
      type: Number,
      required: true,
    },
    eventDocuments: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
