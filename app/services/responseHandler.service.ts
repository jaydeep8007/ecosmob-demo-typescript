import { msg } from "../constants/en";

const handleInternalError = (error: any, next: any) => {
    const err: any = new Error(error);
    err.httpStatusCode = 500;
    err.msg = msg.commonErrorCatch;
    return next(err);
};

const respondWithSuccessData = (res: any, status: any, message: any, data: any) => {
    return res.status(status).json({
        status,
        message,
        data,
    });
};

function respondWithSuccessNoData(res: any, status: any, message: any) {
    return res.status(status).json({
        status,
        message,
    });
}

const respondWithValidationFailed = (res: any, status: any, message: any, errorMessages: any) => {
    return res.status(status).json({
        status,
        message,
        errorMessages,
    });
};

const respondWithFailed = (res: any, status: any, message: any) => {
    return res.status(status).json({
        status,
        message,
    });
};

const respondWithFailedData = (res: any, status: any, message: any, data: any) => {
    return res.status(status).json({
        status,
        message,
        data,
    });
};

const respondWithPagination = (
    res: any,
    statusCode: any,
    message: any,
    data: any,
    count: any,
    pageNo: any,
    totalRecord: any
) => {
    const itemsPerPage = data.length;
    const lastPage = Math.ceil(count / totalRecord);

    const response = {
        status: statusCode,
        message: message,
        data: data,
        pagination: {
            total: count,
            itemsPerPage: totalRecord,
            page: pageNo,
            lastPage: lastPage,
        },
    };
    return res.status(statusCode).json(response);
};

export const responseHandler = {
    handleInternalError,
    respondWithSuccessData,
    respondWithValidationFailed,
    respondWithSuccessNoData,
    respondWithFailed,
    respondWithFailedData,
    respondWithPagination,
};