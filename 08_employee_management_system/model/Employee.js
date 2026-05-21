import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  emp_Id: {
    type: Number,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  designation: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    enum: ["HR", "finance", "it", "security"],
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["active", "terminated", "suspend", "hold"],
    default: "active",
  },
  mobile: {
    type: String,
    minlength: 10,
    required: true,
  },
});

const Employee = mongoose.model("employeeData", employeeSchema);

export default Employee;
