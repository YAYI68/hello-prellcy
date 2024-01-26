"use strict";
exports.__esModule = true;
var express_1 = require("express");
var authController_1 = require("../controllers/authController");
var authMiddleware_1 = require("../middlewares/authMiddleware");
var router = (0, express_1.Router)();
router.post("/login", authController_1.authLogin);
router.post("/register", authController_1.authRegister);
router.use(authMiddleware_1.protectUser);
router.post("/activate", authController_1.activateAccount);
router.post("/resend/otp", authController_1.resendOtP);
router.post("/logout", authController_1.logOut);
exports["default"] = router;
//# sourceMappingURL=authRoute.js.map