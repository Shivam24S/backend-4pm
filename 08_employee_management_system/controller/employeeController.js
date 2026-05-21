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

    newEmployee.save();

    res.status(201).json({
      success: true,
      message: "employee added successfully",
      newEmployee,
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

export default { add };
