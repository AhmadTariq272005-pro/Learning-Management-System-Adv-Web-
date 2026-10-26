import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 160 },
  code: { type: String, required: true, unique: true, uppercase: true, trim: true },
  description: { type: String, trim: true, default: "" },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  credits: { type: Number, required: true, min: 1, max: 12 },
  isPublished: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.models.Course || mongoose.model("Course", courseSchema);
