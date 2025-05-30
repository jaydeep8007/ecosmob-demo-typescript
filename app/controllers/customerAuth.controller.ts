import { RequestHandler } from "express";
import customerModel from "../models/customer.model";
import customerAuthModel from "../models/customerAuth.model";
import { customerValidations } from "../validations/customer.validation";
import commonQuery from "../services/commonQuery.service";
import { responseHandler } from "../services/responseHandler.service";
import { resCode } from "../constants/resCode";
import { msg } from "../constants/en";
import { comparePasswords } from "../services/password.service";
import { authToken } from "../services/authToken.service";

const loginCustomer: RequestHandler = async (req: any, res: any, next: any) => {
  try {
    const payload = req.body;
    const result: any =
      customerValidations.customerLoginSchema.safeParse(payload);
    if (!result.success) {
      return responseHandler.respondWithValidationFailed(
        res,
        resCode.BAD_REQUEST,
        msg.ERROR,
        result.error.flatten()
      );
    }
    let customerData = result.data;

    /* GET DATA OF CUSTOMER */
    let control = new commonQuery(customerModel);
    let filter = { cus_email: customerData.email };
    let projection = {};
    control
      .getData(filter, projection)
      .then(async (data: any) => {
        let customer = data.dataValues;

        /* CHECK IF PROVIDED PASSWORD MATCHS STORED HASH PASSWORD */
        const isMatch = await comparePasswords(
          customerData.password,
          customer.cus_password
        );
        if (isMatch) {
          /* GENERATE JWT AUTH TOKEN */
          const token = await authToken.generateAuthToken({
            user_id: customer.cus_email,
            email: customer.cus_email,
          });
          /* GENERATE JWT REFRESH AUTH TOKEN */
          const refreshToken = await authToken.generateRefreshAuthToken({
            user_id: customer.cus_email,
            email: customer.cus_email,
          });
          console.log(token, refreshToken);

          let authControl = new commonQuery(customerAuthModel);
          /* GET DATA IN CUSTOMER AUTH */
          let filter = { cus_id: customer.cus_id };
          let projection = {};
          authControl.getData(filter, projection).then(async (data: any) => {
            if (data && data.dataValues) {
              let authControl = new commonQuery(data);
              const updateData = await authControl.updateData({
                cus_auth_token: token,
                cus_refresh_auth_token: refreshToken,
              });
            } else {
              /* ADD DATA IN CUSTOMER AUTH */
              const addData = await authControl.create({
                cus_id: customer.cus_id,
                cus_auth_token: token,
                cus_refresh_auth_token: refreshToken,
              });
            }
            return responseHandler.respondWithSuccessNoData(
              res,
              resCode.OK,
              msg.auth.loggedIn
            );
          });
        } else {
          return responseHandler.respondWithFailed(
            res,
            resCode.BAD_REQUEST,
            msg.auth.passwordInvalid
          );
        }
      })
      .catch((error) => {
        return responseHandler.handleInternalError(error, next);
      });
  } catch (error: any) {
    console.error(error.errors, "Error");
    return responseHandler.handleInternalError(error, next);
  }
};

export const customerAuthControl = {
  loginCustomer,
};
