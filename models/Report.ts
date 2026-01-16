import mongoose, { Schema, models } from "mongoose";

const ViolationSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    word: String,
    content: String,
  },
  { timestamps: true }
);

export default models.Violation ||
  mongoose.model("Violation", ViolationSchema);
