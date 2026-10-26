import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  title: { type: String, required: true, trim: true, maxlength: 160 },
  description: { type: String, trim: true, default: "" },
  questions: [{
    questionText: { type: String, required: true, trim: true },
    options: { type: [String], required: true, validate: v => v.length >= 2 },
    correctOptionIndex: { type: Number, required: true, min: 0 },
    marks: { type: Number, required: true, min: 1 }
  }],
  startAt: { type: Date },
  endAt: { type: Date },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

export default mongoose.models.Quiz || mongoose.model("Quiz", quizSchema);
