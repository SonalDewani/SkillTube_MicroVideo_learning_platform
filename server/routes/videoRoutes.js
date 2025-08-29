import express from "express";
import * as Video from "../controller/videoController.js";   // ✅ use import instead of require
import { allowRoles, protect } from "../helper/helperFunctions.js"; 

const router = express.Router();

router.get("/", Video.getVideos);
router.get("/:id", Video.getVideoById);

router.post("/", protect, allowRoles("teacher"), Video.createVideo);
router.put("/:id", protect, allowRoles("teacher"), Video.updateVideo);
router.delete("/:id", protect, allowRoles("teacher"), Video.deleteVideo);

export default router;
