import { Request, Response, NextFunction } from "express";
import CustomError from "../utils/error/CustomError";
import { ZodError } from "zod";
type ErrorType = CustomError & ZodError;
declare const errorController: (error: ErrorType, req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>>;
export default errorController;
