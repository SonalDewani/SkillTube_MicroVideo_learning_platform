# SkillTube: Micro-Video Learning Platform

SkillTube is a web-based platform for users to learn and teach any subject using short videos. The platform supports both students and teachers, enabling easy sharing and consumption of educational content.

## Features
- User registration, authentication, and profile management
- Video upload, browsing, and playback
- Commenting, liking, and reporting videos
- Enrollment in courses/videos
- Notifications for user activity
- Admin management of users, videos, and reports

## Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB

## User Roles
- **Student:** Watches videos, enrolls, comments, likes
- **Teacher:** Uploads videos, manages content, interacts
- **Admin:** Manages users, content, and reports

## Main Models
- **User**: username, email, password, role, profilePicture, bio, socialLinks, createdAt, updatedAt
- **Video**: title, description, url, thumbnail, duration, uploadedBy, category, tags, createdAt, updatedAt
- **Category**: name, description, createdAt
- **Tag**: name, createdAt
- **Comment**: content, author, video, createdAt
- **Like**: user, video, createdAt


## API Endpoints (Sample)
- POST /api/auth/register (all users)
- POST /api/auth/login (all users)
- GET /api//user/me
- GET /api/users/:id
- GET /api/videos  (all users)
- POST /api/videos (teacher)
- PUT /api/videos/:id/delete (teacher,  admin)
- GET /api/videos/:id/comments (all users)
- POST /api/videos/:id/like (all users)
- GET /api/users/:id/notifications (all users)
- POST /api/videos/:id/report (all admiin)

## Future Enhancements
- AI-powered recommendations
- Live streaming
- Multi-language support
