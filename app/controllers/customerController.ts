import { Request, Response } from "express";
import Customer from "../models/Customer.model";

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ message: "Failed to create customer", error });
  }
};

export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await Customer.findAll();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve customers", error });
  }
};

export const getCustomerById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!id) {
       res.status(400).send({ status: 400, message: "Customer ID is required" });
    }

    const customer = await Customer.findByPk(id);

    if (!customer) {
       res.status(404).send({ status: 404, message: "Customer not found" });
    }

     res.status(200).send({
      status: "success",
      message: "Customer retrieved successfully",
      data: customer,
    });
  } catch (error) {
     res.status(500).send({
      message: "Failed to retrieve customer",
      error,
    });
  }
};

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
       res.status(400).send({ status: 400, message: "Customer not found" });
    }
    const updatedFields = Object.keys(req.body);
    const updatedCustomer = await Customer.update(req.body, {
  where: { id: req.params.id }
})
  res.status(200).send({
  status: "success",
  message: "Customer updated successfully",
  updatedFields,
  data: updatedCustomer,
}
);
  } catch (error) {
     res.status(500).send({
      message: "Failed to update customer",
      error,
    });
  }
};

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
      res.status(400).send({ status: 400, message: "Customer not found" });
    }

    await Customer.destroy({ where: { id: req.params.id } });

    res
      .status(200)
      .send({ status: "success", message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete customer", error });
  }
  
};
