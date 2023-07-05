import { ErrorRequestHandler } from "express";
import { sendErrorResponse } from "./createResponse";

const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  return sendErrorResponse(req, res, statusCode, err.message, {});
};

export { errorHandler };
