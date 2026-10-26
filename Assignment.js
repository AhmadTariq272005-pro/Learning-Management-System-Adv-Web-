import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  title: { type: String, required: true, trim: true, maxlength: 160 },
  description: { type: String, required: true, trim: true },
  dueDate: { type: Date, required: true },
  maxMarks: { type: Number, required: true, min: 1 },
  attachmentUrl: { type: String, trim: true, default: "" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

export default mongoose.models.Assignment || mongoose.model("Assignment", assignmentSchema);
