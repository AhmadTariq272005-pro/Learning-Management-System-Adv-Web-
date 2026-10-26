import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 160 },
  message: { type: String, required: true, trim: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", default: null },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  publishedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.models.Announcement || mongoose.model("Announcement", announcementSchema);
