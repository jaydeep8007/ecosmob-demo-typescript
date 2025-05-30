import { Request, Response, NextFunction } from "express";
import customerModel from "../../models/mongo/customer.model";
import { hashPassword } from "../../services/password.service";

export const addCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cus_password, cus_confirm_password, ...rest } = req.body;

    if (cus_password !== cus_confirm_password) {
      return res.status(400).json({ message: "Password and confirm password do not match." });
    }

    const existing = await customerModel.findOne({
      $or: [{ cus_email: req.body.cus_email }, { cus_phone_number: req.body.cus_phone_number }]
    });

    if (existing) {
      return res.status(400).json({ message: "Email or phone already exists." });
    }

    const newCustomer = new customerModel({
      ...rest,
      cus_password: await hashPassword(cus_password),
      cus_confirm_password: await hashPassword(cus_confirm_password),
    });

    await newCustomer.save();

    return res.status(201).json({ message: "Customer added successfully." });
  } catch (error) {
    return next(error);
  }
};

export const getCustomers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customers = await customerModel.find();
    return res.status(200).json({ message: "Data fetched successfully", data: customers });
  } catch (error) {
    return next(error);
  }
};

export const getCustomerById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customer = await customerModel.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    return res.status(200).json({ message: "Customer found", data: customer });
  } catch (error) {
    return next(error);
  }
};

export const updateCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await customerModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Customer not found" });
    }
    return res.status(200).json({ message: "Customer updated successfully", data: updated });
  } catch (error) {
    return next(error);
  }
};

export const deleteCustomerById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await customerModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Customer not found" });
    }
    return res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    return next(error);
  }
};
