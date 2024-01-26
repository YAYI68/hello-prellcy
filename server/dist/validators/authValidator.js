"use strict";
exports.__esModule = true;
exports.otpSchema = exports.registerBodySchema = exports.loginBodySchema = void 0;
var zod_1 = require("zod");
exports.loginBodySchema = zod_1.z.object({
    email: zod_1.z
        .string({
        required_error: "Email is required"
    })
        .email({ message: "Not a valid email" }),
    password: zod_1.z
        .string({ required_error: "Password is required" })
        .min(8, { message: "Must be 8 or more characters long" })
});
exports.registerBodySchema = zod_1.z.object({
    name: zod_1.z.string({ required_error: "Fullname is required" }),
    username: zod_1.z.string({ required_error: "Username is required" }),
    email: zod_1.z
        .string({
        required_error: "Email is required"
    })
        .email({ message: "Not a valid email" }),
    password: zod_1.z
        .string({ required_error: "Password is required" })
        .min(8, { message: "Password Must be 8 or more characters long" })
});
exports.otpSchema = zod_1.z.object({
    otp: zod_1.z
        .string({ required_error: "OTP is required" })
        .min(6, { message: "OTP Must be 6 or more characters long" })
});
//# sourceMappingURL=authValidator.js.map