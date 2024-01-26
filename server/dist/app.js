"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var compression_1 = __importDefault(require("compression"));
var dotenv_1 = __importDefault(require("dotenv"));
var morgan_1 = __importDefault(require("morgan"));
var CustomError_1 = __importDefault(require("./utils/error/CustomError"));
// import errorController from "./controllers/error.controller";
var routes_1 = require("./routes");
var errorController_1 = __importDefault(require("./controllers/errorController"));
var cors_1 = __importDefault(require("cors"));
dotenv_1["default"].config();
var app = (0, express_1["default"])();
// IMPLEMENT MIDDLEWARE
var corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
};
app.use((0, cors_1["default"])(corsOptions));
// app.use(cors())
app.use((0, morgan_1["default"])("dev"));
app.use(express_1["default"].urlencoded({ extended: true }));
app.use(express_1["default"].json());
app.use((0, compression_1["default"])({
    level: 6,
    threshold: 10 * 1000
}));
app.use((0, cookie_parser_1["default"])());
app.use(body_parser_1["default"].json());
app.use(body_parser_1["default"].urlencoded({ extended: true }));
process.on("uncaughtException", function (err) {
    console.log(err.name, err.message);
    console.log("Uncaught Exception occured! Shutting down...");
    process.exit(1);
});
// app routes
app.use(express_1["default"].static(path_1["default"].join(__dirname, "public")));
app.use("/api/v1/auth/", routes_1.authRoute);
app.all("*", function (req, res, next) {
    var err = new CustomError_1["default"]("Can't find ".concat(req.originalUrl, " on the server!"), 404);
    next(err);
});
app.use(errorController_1["default"]);
exports["default"] = app;
//# sourceMappingURL=app.js.map