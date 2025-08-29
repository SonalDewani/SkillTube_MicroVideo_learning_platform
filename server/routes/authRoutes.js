import express from "express";
import { register, login, getMe, logoutUser } from "../controller/authController.js";
import { protect } from "../helper/helperFunctions.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.post("/logout", logoutUser);

export default router;
