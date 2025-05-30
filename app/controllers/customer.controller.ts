// import { Request, Response } from "express";
// import Customer from "../models/Customer.model";

// export const createCustomer = async (req: Request, res: Response) => {
//   try {
//     const customer = await Customer.create(req.body);
//     res.status(201).json(customer);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to create customer", error });
//   }
// };

// export const getAllCustomers = async (req: Request, res: Response) => {
//   try {
//     const customers = await Customer.findAll();
//     res.json(customers);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to retrieve customers", error });
//   }
// };

// export const getCustomerById = async (req: Request, res: Response) => {
//   try {
//     const id = req.params.id;

//     if (!id) {
//        res.status(400).send({ status: 400, message: "Customer ID is required" });
//     }

//     const customer = await Customer.findByPk(id);

//     if (!customer) {
//        res.status(404).send({ status: 404, message: "Customer not found" });
//     }

//      res.status(200).send({
//       status: "success",
//       message: "Customer retrieved successfully",
//       data: customer,
//     });
//   } catch (error) {
//      res.status(500).send({
//       message: "Failed to retrieve customer",
//       error,
//     });
//   }
// };

// export const updateCustomer = async (req: Request, res: Response) => {
//   try {
//     const customer = await Customer.findByPk(req.params.id);
//     if (!customer) {
//        res.status(400).send({ status: 400, message: "Customer not found" });
//     }
//     const updatedFields = Object.keys(req.body);
//     const updatedCustomer = await Customer.update(req.body, {
//   where: { id: req.params.id }
// })
//   res.status(200).send({
//   status: "success",
//   message: "Customer updated successfully",
//   updatedFields,
//   data: updatedCustomer,
// }
// );
//   } catch (error) {
//      res.status(500).send({
//       message: "Failed to update customer",
//       error,
//     });
//   }
// };

// export const deleteCustomer = async (req: Request, res: Response) => {
//   try {
//     const customer = await Customer.findByPk(req.params.id);
//     if (!customer) {
//       res.status(400).send({ status: 400, message: "Customer not found" });
//     }

//     await Customer.destroy({ where: { id: req.params.id } });

//     res
//       .status(200)
//       .send({ status: "success", message: "Customer deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to delete customer", error });
//   }

// };

import { RequestHandler } from "express";
import { Request, Response, NextFunction } from "express";
import customerModel from "../models/customer.model";
import { responseHandler } from "../services/responseHandler.service";
import { customerValidations } from "../validations/customer.validation";
import commonQuery from "../services/commonQuery.service";
import { resCode } from "../constants/resCode";
import { msg } from "../constants/en";
import { hashPassword } from "../services/password.service";

export const createCustomer: RequestHandler = async (
  req: any,
  res: any,
  next: any
) => {
  try {
    const payload = req.body;
    const result: any =
      customerValidations.customerCreateSchema.safeParse(payload);
    if (!result.success) {
      return responseHandler.respondWithValidationFailed(
        res,
        resCode.BAD_REQUEST,
        msg.ERROR,
        result.error.flatten()
      );
    }
    let customerData = result.data;

    if (customerData.cus_password == customerData.cus_confirm_password) {
      let control = new commonQuery(customerModel);
      const addData = await control.create({
        cus_firstname: customerData.cus_firstname,
        cus_lastname: customerData.cus_lastname,
        cus_email: customerData.cus_email,
        cus_phone_number: customerData.cus_phone_number,
        cus_password: await hashPassword(customerData.cus_password),
        cus_confirm_password: await hashPassword(
          customerData.cus_confirm_password
        ),
      });
      return responseHandler.respondWithSuccessData(
        res,
        resCode.OK,
        msg.customer.addsuccess,
        addData
      );
    } else {
      return responseHandler.respondWithFailed(
        res,
        resCode.BAD_REQUEST,
        msg.auth.passMatchConPass
      );
    }
  } catch (error: any) {
    console.error(error.errors, "Error");
    return responseHandler.handleInternalError(error, next);
  }
};

export const getAllCustomers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customers = await customerModel.findAll();
    return responseHandler.respondWithSuccessData(
      res,
      200,
      msg.dataFetchSuccess,
      customers
    );
  } catch (error) {
    return responseHandler.handleInternalError(error, next);
  }
};

export const getCustomerById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    if (!id) {
      return responseHandler.respondWithFailed(res, 400, msg.invalidId);
    }

    const customer = await customerModel.findByPk(id);

    if (!customer) {
      return responseHandler.respondWithFailed(res, 404, msg.invalidId);
    }

    return responseHandler.respondWithSuccessData(
      res,
      200,
      msg.dataFetchSuccess,
      customer
    );
  } catch (error) {
    return responseHandler.handleInternalError(error, next);
  }
};

export const updateCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const customer = await customerModel.findByPk(id);

    if (!customer) {
      return responseHandler.respondWithFailed(res, 400, msg.invalidId);
    }

    await customerModel.update(req.body, { where: { id } });

    return responseHandler.respondWithSuccessNoData(
      res,
      200,
      msg.dataUpdateSuccess
    );
  } catch (error) {
    return responseHandler.handleInternalError(error, next);
  }
};

export const deleteCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const customer = await customerModel.findByPk(id);

    if (!customer) {
      return responseHandler.respondWithFailed(res, 400, msg.invalidId);
    }

    await customerModel.destroy({ where: { id } });

    return responseHandler.respondWithSuccessNoData(
      res,
      200,
      msg.dataDeleteSuccess
    );
  } catch (error) {
    return responseHandler.handleInternalError(error, next);
  }
};
