import { Router } from "express";
import {
  activateAccount,
  authLogin,
  authRegister,
  logOut,
  resendOtP,
} from "../controllers/authController";
import { protectUser } from "../middlewares/authMiddleware";

const router = Router();

router.post("/login", authLogin);
router.post("/register", authRegister);

router.use(protectUser);
router.post("/activate", activateAccount);
router.post("/resend/otp", resendOtP);
router.post("/logout", logOut);

export default router;
