import { z } from "zod";

export const loginBodySchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({ message: "Not a valid email" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Must be 8 or more characters long" }),
});

export const registerBodySchema = z.object({
  name: z.string({ required_error: "Fullname is required" }),
  username: z.string({ required_error: "Username is required" }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({ message: "Not a valid email" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password Must be 8 or more characters long" }),
});

export const otpSchema = z.object({
  otp: z
    .string({ required_error: "OTP is required" })
    .min(6, { message: "OTP Must be 6 or more characters long" }),
});
