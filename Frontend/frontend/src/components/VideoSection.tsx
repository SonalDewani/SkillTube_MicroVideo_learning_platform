import React, { useEffect, useState } from "react";
import { Play, Clock, Eye } from "lucide-react";
import axios from "axios";


export default function VideoSection() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/videos");
        setVideos(response.data.data || []);
      } catch (err) {
        setVideos([]);
      }
      setLoading(false);
    };
    fetchVideos();
  }, []);

  return (
    <div className="py-8 fade-in">
      <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
        <Play className="h-6 w-6 text-brand" />
        Recommended for You
      </h2>
      {loading ? (
        <div className="text-muted-foreground">Loading videos...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video, index) => (
            <div key={video._id || index} className="video-card group cursor-pointer">
              <div className="relative overflow-hidden rounded-t-xl">
                <img 
                  src={video.thumbnail || video.url} 
                  alt={video.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" 
                />
                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                  <Clock className="inline h-3 w-3 mr-1" />
                  {video.duration || "--:--"}
                </div>
                {/* Play Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="bg-brand/90 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-75 group-hover:scale-100">
                    <Play className="h-6 w-6 text-white fill-current" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-card-foreground line-clamp-2 text-sm leading-relaxed mb-2 group-hover:text-brand transition-colors duration-200">
                  {video.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-2 hover:text-foreground transition-colors duration-200">
                  {video.channel || (video.uploadedBy && video.uploadedBy.username) || "Unknown"}
                </p>
                <div className="flex items-center text-xs text-muted-foreground space-x-3">
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {video.views ? `${video.views} views` : "No views"}
                  </div>
                  <span>•</span>
                  <span>{video.uploadTime || video.createdAt || ""}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}