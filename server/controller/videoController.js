import Video from "../model/videoModel.js";

// ================== CREATE / UPLOAD ==================
export const createVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No video file uploaded" });
    }

    // Cloudinary URL comes from multer-storage-cloudinary
    const videoUrl = req.file.path;

    const body = {
      ...req.body,
      url: videoUrl,
      uploadedBy: req.user.id, // from auth middleware
    };

    const video = await Video.create(body);

    res.status(201).json({
      success: true,
      message: "Video uploaded successfully",
      data: video,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message || "Something went wrong" });
  }
};

// ================== GET ALL VIDEOS ==================
export const getVideos = async (req, res) => {
  try {
    const { category, tag, q } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (tag) filter.tags = tag;
    if (q) filter.title = { $regex: q, $options: "i" };

    const videos = await Video.find(filter)
      .sort({ createdAt: -1 })
      .populate("uploadedBy", "username email");

    res.status(200).json({
      success: true,
      message: videos.length ? "Videos fetched successfully" : "No videos found",
      data: videos,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message || "Something went wrong" });
  }
};

// ================== GET VIDEO BY ID ==================
export const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate("uploadedBy", "username email");
    if (!video) {
      return res.status(404).json({ success: false, message: "Video not found" });
    }

    // Increment views
    video.views += 1;
    await video.save();

    res.status(200).json({ success: true, data: video });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message || "Something went wrong" });
  }
};

// ================== UPDATE VIDEO ==================
export const updateVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ success: false, message: "Video not found" });
    }

    // Only uploader, teacher, or admin can update
    if (String(video.uploadedBy) !== req.user.id && !["teacher", "admin"].includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    const fields = ["title", "description", "url", "thumbnail", "tags", "duration", "category"];
    fields.forEach((f) => {
      if (req.body[f] !== undefined) video[f] = req.body[f];
    });

    await video.save();

    res.status(200).json({ success: true, message: "Video updated successfully", data: video });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message || "Something went wrong" });
  }
};

// ================== DELETE VIDEO ==================
export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ success: false, message: "Video not found" });
    }

    // Only uploader, teacher, or admin can delete
    if (String(video.uploadedBy) !== req.user.id && !["teacher", "admin"].includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    await video.deleteOne();

    res.status(200).json({ success: true, message: "Video deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message || "Something went wrong" });
  }
};
