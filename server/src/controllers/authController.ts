import { Request, Response } from "express";
import { comparePassword, createJwt, hashPassword } from "../utils/helpers";
import {
  loginBodySchema,
  otpSchema,
  registerBodySchema,
} from "../validators/authValidator";
import { tryCatch } from "../utils/helpers/tryCatch";
import CustomError from "../utils/error/CustomError";
import prisma from "../db";

export const authRegister = tryCatch(async (req: Request, res: Response) => {
  const { name, email, username, password } = registerBodySchema.parse(
    req.body
  );

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  
  // Hash password
  const passwordHash = await hashPassword(password);

  // Create user
  const user = await prisma.user.create({
    data: {
      name: name,
      username: username,
      email: email,
      password: passwordHash,
    },
  });

  const accessToken = createJwt(
    {
      userId: user.id,
    },
    { expiresIn: 15 * 60 } //expire in 15 minute
  );

  const refreshToken = createJwt(
    {
      userId: user.id,
    },
    { expiresIn: 24 * 60 * 60 }
  );
  // link to confirm
  const randomOtp = Math.floor(Math.random() * 1000000).toString();
  const userToken = await prisma.token.create({
    data: {
      userId: user.id,
      otp: randomOtp,
      refreshToken,
    },
  });
  res.status(201).json({
    message: "Your account is registered successfully,Kindly enter the OTP to activate your account",
    Otp: randomOtp, accessToken ,
  });
});

export const authLogin = tryCatch(async (req: Request, res: Response) => {
  const data = loginBodySchema.parse(req.body);
  const { email, password } = data;
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    throw new CustomError("Invalid credentials", 400);
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new CustomError("Invalid credentials", 400);
  }

  if (!user.isActive) {
    return res.status(203).json({
      status: "pending",
      message: "Kindly enter your otp to activate your account",
    });
  }
  const accessToken = createJwt(
    {
      userId: user.id,
    },
    { expiresIn: 15 * 60 } //expire in 15 minute
  );

  const refreshToken = createJwt(
    {
      userId: user.id,
    },
    { expiresIn: 24 * 60 * 60 }
  ); //expire in 1day

  res.cookie("refresh", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  });
  const userData = {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    isActive: user.isActive,
  };
  const userToken = await prisma.token.update({
    where: {
      userId: user.id,
    },
    data: {
      refreshToken: refreshToken,
    },
  });
  return res.status(201).json({ status: "success", user: userData,  accessToken});
});

export const activateAccount = tryCatch(async (req: Request, res: Response) => {
  const { otp } = otpSchema.parse(req.body);
  const authUser = req["user"];

  const token = await prisma.token.findUnique({
    where: {
      otp: otp,
      userId: authUser.userId,
    },
  });
  if (!token) {
    throw new CustomError("Invalid Otp", 400);
  }

  const user = await prisma.user.update({
    where: {
      id: token.userId,
    },
    data: {
      isActive: true,
    },
  });
  const userData = {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    isActive: user.isActive,
  };
  return res.status(201).json({ status: "success", message:"Your account is successfully activated " });
});

export const resendOtP = tryCatch(async (req: Request, res: Response) => {
  const authUser = req["user"];
  const user = await prisma.user.findUnique({
    where: {
      id: authUser.userId,
    },
  });
  if (!user) {
    throw new CustomError("UnAuthorized User", 400);
  }

  const randomOtp = Math.floor(Math.random() * 1000000).toString();

  const token = await prisma.token.update({
    where: {
      userId: user.id,
    },
    data: {
      otp: randomOtp,
    },
  });
  return res.status(201).json({ status: "success", otp: randomOtp });
});

export const logOut = tryCatch(async (req: Request, res: Response) => {
  const authUser = req["user"];
  const user = await prisma.user.findUnique({
    where: {
      id: authUser.userId,
    },
  });
  res.clearCookie("refresh");
  return res
    .status(201)
    .json({ status: "success", message: "User Successfully log out" });
});
