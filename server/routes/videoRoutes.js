import express from "express";
import {
  createVideo,
  getVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
} from "../controller/videoController.js";

import upload from "../config/multer.js";
import { protect, allowRoles } from "../helper/helperFunctions.js";

const router = express.Router();

// ✅ Only teacher & admin can upload videos
router.post(
  "/",
  protect,
  allowRoles("teacher", "admin"),
  upload.single("video"),
  createVideo
);

// ✅ Everyone can view videos
router.get("/", getVideos);
router.get("/:id", getVideoById);

// ✅ Only teacher & admin can update videos
router.put(
  "/:id",
  protect,
  allowRoles("teacher", "admin"),
  updateVideo
);

// ✅ Only teacher & admin can delete videos
router.delete(
  "/:id",
  protect,
  allowRoles("teacher", "admin"),
  deleteVideo
);

export default router;
