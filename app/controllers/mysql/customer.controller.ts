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
import { Request, Response, RequestHandler } from "express";
import customerModel from "../../models/mysql/customer.model";
import { customerValidations } from "../../validations/customer.validation";
import commonQuery from "../../services/commonQuery.service";
import { responseHandler } from "../../services/responseHandler.service";
import { resCode } from "../../constants/resCode";
import { msg } from "../../constants/en";
import { hashPassword } from "../../services/password.service";
import { UniqueConstraintError } from "sequelize";

/* CREATE CUSTOMER */
const addCustomer: RequestHandler = async (req, res, next) => {
  try {
    const result = customerValidations.customerCreateSchema.safeParse(req.body);
    if (!result.success) {
      return responseHandler.respondWithValidationFailed(
        res,
        resCode.BAD_REQUEST,
        msg.ERROR,
        result.error.flatten()
      );
    }

    const data = result.data;

    if (data.cus_password !== data.cus_confirm_password) {
      return responseHandler.respondWithFailed(
        res,
        resCode.BAD_REQUEST,
        msg.auth.passMatchConPass
      );
    }

    let control = new commonQuery(customerModel);
    let allData = await control.create({
      cus_firstname: data.cus_firstname,
      cus_lastname: data.cus_lastname,
      cus_email: data.cus_email,
      cus_phone_number: data.cus_phone_number,
      cus_password: await hashPassword(data.cus_password),
      cus_confirm_password: await hashPassword(data.cus_confirm_password),
    });

    return responseHandler.respondWithSuccessData(
      res,
      resCode.OK,
      msg.customer.addsuccess,
      allData
    );
  } catch (error: any) {
    if (error instanceof UniqueConstraintError) {
      const field = error.errors?.[0]?.path;
      const message =
        field === "cus_email"
          ? msg.auth.emailAlreadyExist
          : field === "cus_phone_number"
          ? "Phone number already exists"
          : msg.ERROR;

      return responseHandler.respondWithFailed(
        res,
        resCode.BAD_REQUEST,
        message
      );
    }

    return responseHandler.handleInternalError(error, next);
  }
};
const getCustomers = async (
  req: Request,
  res: Response,
  next: any
): Promise<void> => {
  try {
    const customers = await customerModel.findAll();

    if (!customers || customers.length === 0) {
      res.status(400).json({
        success: false,
        message: "User not found with specified Id.",
        data: [],
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Data Fetched Successfully",
      data: customers,
    });
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};




// Get Customer by ID
const getCustomerById: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const customer = await customerModel.findByPk(id);

    if (!customer) {
      return responseHandler.respondWithFailed(res, resCode.BAD_REQUEST, msg.invalidId);
    }

    return responseHandler.respondWithSuccessData(
      res,
      resCode.OK,
      msg.dataFetchSuccess,
      customer
    );
  } catch (error) {
    return responseHandler.handleInternalError(error, next);
  }
};



// Delete Customer
const deleteCustomerById: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const customer = await customerModel.findOne({ where: { cus_id: id } });

    if (!customer) {
      return responseHandler.respondWithFailed(res, resCode.BAD_REQUEST, msg.invalidId);
    }

    await customerModel.destroy({ where: { cus_id: id } });

    return responseHandler.respondWithSuccessNoData(
      res,
      resCode.OK,
      msg.dataDeleteSuccess
    );
  } catch (error) {
    return responseHandler.handleInternalError(error, next);
  }
};


const updateCustomer: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const customer = await customerModel.findOne({ where: { cus_id: id } });

    if (!customer) {
      return responseHandler.respondWithFailed(res, resCode.BAD_REQUEST, msg.invalidId);
    }

    await customerModel.update(req.body, { where: { cus_id: id } });

    return responseHandler.respondWithSuccessNoData(
      res,
      resCode.OK,
      msg.dataUpdateSuccess
    );
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "name" in error &&
      (error as { name?: string }).name === "SequelizeUniqueConstraintError"
    ) {
      return responseHandler.respondWithFailed(
        res,
        resCode.BAD_REQUEST,
        "Email or phone number already in use."
      );
    }
    return responseHandler.handleInternalError(error, next);
  }
};


export const customerControl = {
  addCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomerById,
};