import Video from "../model/videoModel.js";

export const createVideo = async (req, res, next) => {
  try {
    const body = { ...req.body, uploadedBy: req.user.id };
    const video = await Video.create(body);
    res.status(201).json(video);
  } catch (err) { next(err); }
};

export const getVideos = async (req, res, next) => {
  try {
    const { category, tag, q } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (tag) filter.tags = tag;
    if (q) filter.title = { $regex: q, $options: "i" };

    const videos = await Video.find(filter)
      .sort({ createdAt: -1 })
      .populate("uploadedBy", "username email");

    if (!videos.length) {
      return res.status(200).json({ message: "No videos found", data: [] });
    }

    res.status(200).json({ message: "Videos fetched successfully", data: videos });
  } catch (err) {
    next(err);
  }
};


export const getVideoById = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id).populate("uploadedBy", "username email");
    if (!video) return res.status(404).json({ message: "Video not found" });
    // increment views
    video.views += 1;
    await video.save();
    res.json(video);
  } catch (err) { next(err); }
};

export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });
    if (String(video.uploadedBy) !== req.user.id && req.user.role !== "teacher") {
      return res.status(403).json({ message: "Forbidden" });
    }
    const fields = ["title", "description", "url", "thumbnail", "tags", "duration", "category"];
    fields.forEach(f => { if (req.body[f] !== undefined) video[f] = req.body[f]; });
    await video.save();
    res.json(video);
  } catch (err) { next(err); }
};

export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });
    if (String(video.uploadedBy) !== req.user.id && req.user.role !== "teacher") {
      return res.status(403).json({ message: "Forbidden" });
    }
    await video.deleteOne();
    res.json({ message: "Video deleted" });
  } catch (err) { next(err); }
};
