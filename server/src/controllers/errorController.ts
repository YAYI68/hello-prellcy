import { Request, Response, NextFunction } from "express";
import CustomError from "../utils/error/CustomError";
import { ZodError } from "zod";
import { ErrorValidator } from "../validators/ErrorValidator";

// const zodValidatorError = (error: ZodError) => {};
type ErrorType = CustomError & ZodError;

const errorController = (
  error: ErrorType,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validator = new ErrorValidator(res, error);
  next;
  if (error.name === "ZodError") {
    return validator.zodValidator();
  }
  if (error.isOperational) {
    return validator.customValidator();
  }
  if (error.name === "PayloadTooLargeError") {
    return validator.largePayload();
  } else {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default errorController;
