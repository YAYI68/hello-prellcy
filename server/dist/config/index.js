"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var lodash_merge_1 = __importDefault(require("lodash.merge"));
process.env.NODE_ENV = process.env.NODE_ENV || "development";
var stage = process.env.STAGE || "local";
var envConfig;
if (stage === "production") {
    envConfig = require("./production")["default"];
}
else {
    envConfig = require("./local")["default"];
}
exports["default"] = (0, lodash_merge_1["default"])({
    stage: stage,
    dbUrl: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET,
    port: process.env.PORT
}, envConfig);
//# sourceMappingURL=index.js.map