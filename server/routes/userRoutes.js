
import express from "express";
import { register, login, getMe, logoutUser } from "../controller/authController.js";
import { protect } from "../helper/helperFunctions.js";
import * as userController from "../controller/userController.js";

const router = express.Router();


// Edit user profile (username or role)
router.put("/profile", protect, userController.editProfile);

// Change user password
router.put("/change-password", protect, userController.changePassword);

// Change user role to teacher
router.put("/change-role", protect, userController.changeRole);

export default router;
