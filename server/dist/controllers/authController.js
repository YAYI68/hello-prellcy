"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.logOut = exports.resendOtP = exports.activateAccount = exports.authLogin = exports.authRegister = void 0;
var helpers_1 = require("../utils/helpers");
var authValidator_1 = require("../validators/authValidator");
var tryCatch_1 = require("../utils/helpers/tryCatch");
var CustomError_1 = __importDefault(require("../utils/error/CustomError"));
var db_1 = __importDefault(require("../db"));
exports.authRegister = (0, tryCatch_1.tryCatch)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, username, password, existingUser, passwordHash, user, accessToken, refreshToken, randomOtp, userToken;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = authValidator_1.registerBodySchema.parse(req.body), name = _a.name, email = _a.email, username = _a.username, password = _a.password;
                return [4 /*yield*/, db_1["default"].user.findUnique({
                        where: {
                            email: email
                        }
                    })];
            case 1:
                existingUser = _b.sent();
                if (existingUser) {
                    return [2 /*return*/, res.status(400).json({ message: "User already exists" })];
                }
                return [4 /*yield*/, (0, helpers_1.hashPassword)(password)];
            case 2:
                passwordHash = _b.sent();
                return [4 /*yield*/, db_1["default"].user.create({
                        data: {
                            name: name,
                            username: username,
                            email: email,
                            password: passwordHash
                        }
                    })];
            case 3:
                user = _b.sent();
                accessToken = (0, helpers_1.createJwt)({
                    userId: user.id
                }, { expiresIn: 15 * 60 } //expire in 15 minute
                );
                refreshToken = (0, helpers_1.createJwt)({
                    userId: user.id
                }, { expiresIn: 24 * 60 * 60 });
                randomOtp = Math.floor(Math.random() * 1000000).toString();
                return [4 /*yield*/, db_1["default"].token.create({
                        data: {
                            userId: user.id,
                            otp: randomOtp,
                            refreshToken: refreshToken
                        }
                    })];
            case 4:
                userToken = _b.sent();
                res.status(201).json({
                    message: "Your account is registered successfully,Kindly enter the OTP to activate your account",
                    Otp: randomOtp,
                    accessToken: accessToken
                });
                return [2 /*return*/];
        }
    });
}); });
exports.authLogin = (0, tryCatch_1.tryCatch)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, email, password, user, isMatch, accessToken, refreshToken, userData, userToken;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = authValidator_1.loginBodySchema.parse(req.body);
                email = data.email, password = data.password;
                return [4 /*yield*/, db_1["default"].user.findUnique({
                        where: {
                            email: email
                        }
                    })];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new CustomError_1["default"]("Invalid credentials", 400);
                }
                return [4 /*yield*/, (0, helpers_1.comparePassword)(password, user.password)];
            case 2:
                isMatch = _a.sent();
                if (!isMatch) {
                    throw new CustomError_1["default"]("Invalid credentials", 400);
                }
                if (!user.isActive) {
                    return [2 /*return*/, res.status(203).json({
                            status: "pending",
                            message: "Kindly enter your otp to activate your account"
                        })];
                }
                accessToken = (0, helpers_1.createJwt)({
                    userId: user.id
                }, { expiresIn: 15 * 60 } //expire in 15 minute
                );
                refreshToken = (0, helpers_1.createJwt)({
                    userId: user.id
                }, { expiresIn: 24 * 60 * 60 });
                res.cookie("refresh", refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "none",
                    maxAge: 24 * 60 * 60 * 1000
                });
                userData = {
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    isActive: user.isActive
                };
                return [4 /*yield*/, db_1["default"].token.update({
                        where: {
                            userId: user.id
                        },
                        data: {
                            refreshToken: refreshToken
                        }
                    })];
            case 3:
                userToken = _a.sent();
                return [2 /*return*/, res.status(201).json({ status: "success", user: userData, accessToken: accessToken })];
        }
    });
}); });
exports.activateAccount = (0, tryCatch_1.tryCatch)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var otp, authUser, token, user, userData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                otp = authValidator_1.otpSchema.parse(req.body).otp;
                authUser = req["user"];
                return [4 /*yield*/, db_1["default"].token.findUnique({
                        where: {
                            otp: otp,
                            userId: authUser.userId
                        }
                    })];
            case 1:
                token = _a.sent();
                if (!token) {
                    throw new CustomError_1["default"]("Invalid Otp", 400);
                }
                return [4 /*yield*/, db_1["default"].user.update({
                        where: {
                            id: token.userId
                        },
                        data: {
                            isActive: true
                        }
                    })];
            case 2:
                user = _a.sent();
                userData = {
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    isActive: user.isActive
                };
                return [2 /*return*/, res.status(201).json({ status: "success", message: "Your account is successfully activated " })];
        }
    });
}); });
exports.resendOtP = (0, tryCatch_1.tryCatch)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authUser, user, randomOtp, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authUser = req["user"];
                return [4 /*yield*/, db_1["default"].user.findUnique({
                        where: {
                            id: authUser.userId
                        }
                    })];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new CustomError_1["default"]("UnAuthorized User", 400);
                }
                randomOtp = Math.floor(Math.random() * 1000000).toString();
                return [4 /*yield*/, db_1["default"].token.update({
                        where: {
                            userId: user.id
                        },
                        data: {
                            otp: randomOtp
                        }
                    })];
            case 2:
                token = _a.sent();
                return [2 /*return*/, res.status(201).json({ status: "success", otp: randomOtp })];
        }
    });
}); });
exports.logOut = (0, tryCatch_1.tryCatch)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authUser, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authUser = req["user"];
                return [4 /*yield*/, db_1["default"].user.findUnique({
                        where: {
                            id: authUser.userId
                        }
                    })];
            case 1:
                user = _a.sent();
                res.clearCookie("refresh");
                return [2 /*return*/, res
                        .status(201)
                        .json({ status: "success", message: "User Successfully log out" })];
        }
    });
}); });
//# sourceMappingURL=authController.js.map