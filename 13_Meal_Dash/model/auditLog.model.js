import mongoose from "mongoose";

const auditLogSchema = mongoose.Schema({
  action: {
    type: String,
    required: true,
  },
  performedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  module: {
    type: String,
    required: true,
  },
  targetedId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  Ip: {
    type: String,
    required: true,
  },
  userAgent: {
    type: String,
    required: true,
  },
});

const auditLog = mongoose.model("audit", auditLogSchema);

export default auditLog;
