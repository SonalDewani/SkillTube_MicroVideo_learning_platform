import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudnery.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "videos",             // Cloudinary folder
    resource_type: "video",       // Important for videos
    format: async () => "mp4",    // Convert to mp4
    public_id: (req, file) => Date.now() + "-" + file.originalname.split(".")[0],
  },
});

const upload = multer({ storage });

export default upload;
