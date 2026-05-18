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

const getStudentById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);

    if (!student) {
      return next(new HttpError("student not found with this id", 404));
    }

    res.status(200).json({ success: true, message: "student found", student });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const deleteStudent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleteStudent = await Student.findByIdAndDelete(id);

    if (!deleteStudent) {
      return next(new HttpError("student not deleted with this id", 400));
    }

    res
      .status(200)
      .json({ success: true, message: "student data deleted successfully" });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const updateStudent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedStudent = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updateStudent) {
      return next(new HttpError("student data not updated", 400));
    }

    res.status(200).json({
      success: true,
      message: "student data updated successfully",
      updateStudent: updateStudent,
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

export default {
  add,
  getAllStudentData,
  getStudentById,
  deleteStudent,
  updateStudent,
};
