import { Request, Response } from 'express';
import Customer from '../sequelize/models/Customer.model';

export const createCustomer = async (req: Request, res: Response) => {
  const customer = await Customer.create(req.body);
  res.status(201).json(customer);
};

export const getAllCustomers = async (req: Request, res: Response) => {
  const customers = await Customer.findAll();
  res.json(customers);
};

// export const getCustomerById = async (req: Request, res: Response) => {
// //      const customers = await Customer.findAll();
// //   res.json(customers);
// const id = req.params.id;
//   if (!id) return res.status(400).send('Customer ID is required');
//  const customer = await Customer.findOne({where:{id:id as string}}); 
// //   if (!customer) return res.status(404).send('Customer not found');
// //   res.json(customer);
// };

// export const getCustomerById = async (req: Request, res: Response) => {
//   try {
//     const id:string = req.params.id;
//     if (!id) return res.status(400).send('Customer ID is required');

//     const customer:any = await Customer.findOne({ where: { id } });

//     if (!customer) return res.status(404).send('Customer not found');

//     return res.json(customer);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send('Server error');
//   }
// };

// export const updateCustomer = async (req: Request, res: Response) => {
//   const customer = await Customer.findByPk(req.params.id);
//   if (!customer) return res.status(404).send('Customer not found');
//   await customer.update(req.body);
//   res.json(customer);
// };

// export const deleteCustomer = async (req: Request, res: Response) => {
//   const customer = await Customer.findByPk(req.params.id);
//   if (!customer) return res.status(404).send('Customer not found');
//   await customer.destroy();
//   res.status(204).send();
// };
