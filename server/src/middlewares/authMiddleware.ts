import { NextFunction, Request, Response } from "express";
import { verifyJwt } from "../utils/helpers";

export const protectUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    return res
      .status(401)
      .json({ status: "error", message: "UnAuthorized User" });
  }
  const [, token] = bearer.split(" ");
  if (!token) {
    return res
      .status(401)
      .json({ status: "error", message: "UnAuthorized User" });
  }
  try {
    const payload = verifyJwt(token);
    req["user"] = payload;
    return next();
  } catch (e) {
    return res
      .status(401)
      .json({ status: "error", message: "UnAuthorized User" });
  }
};
