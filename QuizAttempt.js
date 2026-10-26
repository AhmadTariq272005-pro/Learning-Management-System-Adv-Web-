import mongoose from "mongoose";

const quizAttemptSchema = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  answers: [{ questionIndex: { type: Number, required: true, min: 0 }, selectedOptionIndex: { type: Number, required: true, min: 0 } }],
  score: { type: Number, min: 0, default: 0 },
  submittedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.models.QuizAttempt || mongoose.model("QuizAttempt", quizAttemptSchema);
