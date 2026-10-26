import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  assignment: { type: mongoose.Schema.Types.ObjectId, ref: "Assignment", required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  submissionUrl: { type: String, required: true, trim: true },
  submittedAt: { type: Date, default: Date.now },
  feedback: { type: String, trim: true, default: "" },
  marks: { type: Number, min: 0 }
}, { timestamps: true });

submissionSchema.index({ assignment: 1, student: 1 }, { unique: true });
export default mongoose.models.Submission || mongoose.model("Submission", submissionSchema);
