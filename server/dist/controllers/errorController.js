"use strict";
exports.__esModule = true;
var ErrorValidator_1 = require("../validators/ErrorValidator");
var errorController = function (error, req, res, next) {
    var validator = new ErrorValidator_1.ErrorValidator(res, error);
    next;
    if (error.name === "ZodError") {
        return validator.zodValidator();
    }
    if (error.isOperational) {
        return validator.customValidator();
    }
    if (error.name === "PayloadTooLargeError") {
        return validator.largePayload();
    }
    else {
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports["default"] = errorController;
//# sourceMappingURL=errorController.js.map