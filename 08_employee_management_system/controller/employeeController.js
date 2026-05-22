import Employee from "../model/Employee.js";

import HttpError from "../middleware/HttpError.js";

const add = async (req, res, next) => {
  try {
    const {
      name,
      email,
      emp_Id,
      designation,
      department,
      salary,
      status,
      mobile,
    } = req.body;

    // const newEmployee = await new Employee.create({

    // })

    const newEmployee = await new Employee({
      name,
      email,
      emp_Id,
      designation,
      department,
      salary,
      status,
      mobile,
    });

    await newEmployee.save();

    res.status(201).json({
      success: true,
      message: "employee added successfully",
      newEmployee,
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const getAllEmployee = async (req, res, next) => {
  try {
    const employees = await Employee.find({});

    if (employees.length === 0) {
      return next(new HttpError("no employee data found", 404));
    }

    res.status(200).json({
      success: true,
      message: "employee data fetched successfully",
      total: employees.length,
      employees,
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const getEmployeeById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id);

    if (!employee) {
      return next(new HttpError("employee not found with this id", 404));
    }

    return res
      .status(200)
      .json({ success: true, message: "employee found", employee });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const deleteEmployeeById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findByIdAndDelete(id);

    

    if (!employee) {
      return next(new HttpError("employee not found with this id", 404));
    }

    res
      .status(200)
      .json({ success: true, message: "employee deleted successfully" });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const deleteAllEmployee = async (req, res, next) => {
  try {
    const deleteAllEmployee = await Employee.deleteMany();

    if (!deleteAllEmployee) {
      return next(new HttpError("failed to delete employee data", 404));
    }

    res.status(200).json({
      success: true,
      message: "all employee data deleted successfully",
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const updateEmployeeData = async (req, res, next) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!employee) {
      return next(new HttpError("failed to update employee data", 404));
    }

    res
      .status(200)
      .json({ success: true, message: "employee data updated", employee });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const updateManually = async (req, res, next) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id);

    if (!employee) {
      return next(new HttpError("employee not found with this id", 404));
    }

    const updates = Object.keys(req.body);

    const allowedUpdates = ["name", "email", "mobile"];

    const isValidUpdates = updates.every((u) => allowedUpdates.includes(u));

    if (!isValidUpdates) {
      return next(new HttpError("only allowed field can be updates", 400));
    }

    updates.forEach((update) => (employee[update] = req.body[update]));

    await employee.save();

    res.status(200).json({
      success: true,
      message: "employee data updated successfully",
      employee,
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

export default {
  add,
  getAllEmployee,
  getEmployeeById,
  deleteEmployeeById,
  deleteAllEmployee,
  updateEmployeeData,
  updateManually,
};
