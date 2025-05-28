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
    if (!id) return res.status(400).send("Customer ID is required");

    const customer = await Customer.findByPk(id);
    if (!customer) return res.status(404).send("Customer not found");

    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve customer", error });
  }
};

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) return res.status(404).send("Customer not found");

    await customer.update(req.body);
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: "Failed to update customer", error });
  }
};

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) return res.status(404).send("Customer not found");

    await customer.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Failed to delete customer", error });
  }
};
