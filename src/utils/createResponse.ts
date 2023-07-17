import { Request, Response } from "express";

interface ResponseDetails {
  res: Response;
  statusCode: number;
  success: boolean;
  msg: string;
  data?: any;
  error?: any;
}

export const sendResponse = (resDetails: ResponseDetails) => {
  const { res, statusCode, success, msg, data = {}, error = {} } = resDetails;

  return res.status(statusCode).json({
    success,
    msg,
    data,
    error,
  });
};

export const sendSuccessResponse = (
  res: Response,
  msg: string = "success",
  statusCode: number = 200,
  data: any = {}
) => {
  return sendResponse({
    res,
    statusCode,
    success: true,
    msg,
    data,
  });
};

export const sendErrorResponse = (
  _req: Request,
  res: Response,
  statusCode: number = 500,
  msg: string = "Server Error.",
  error: any = {}
) => {
  return sendResponse({
    res,
    statusCode,
    success: false,
    msg,
    error,
  });
};
