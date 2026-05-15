import HttpError from "../middleware/HttpError.js";

import Student from "../model/Student.js";

const add = async (req, res, next) => {
  try {
    const { name, grId, email, course, isActive, mobileNumber } = req.body;

    const newStudent = await new Student({
      name,
      grId,
      email,
      course,
      isActive,
      mobileNumber,
    });

    await newStudent.save();

    res.status(201).json({
      success: true,
      message: "student data added successfully",
      newStudent,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const getAllStudentData = async (req, res, next) => {
  try {
    const students = await Student.find({});

    if (students.length <= 0) {
      res.status(200).json({ success: true, message: "no student data found" });
    }

    res.status(200).json({
      success: true,
      total: students.length,
      message: "student data fetched successfully",
      students,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

export default { add, getAllStudentData };
