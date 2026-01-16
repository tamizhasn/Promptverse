import mongoose, { Schema, models } from "mongoose";

const PromptSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    promptText: { type: String, required: true },

    category: String,
    outputType: String,
    difficulty: String,

    previewImage: String,

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },

    // 🛡️ Moderation
    isHidden: { type: Boolean, default: false },
    reportCount: { type: Number, default: 0 },

    // 📊 Analytics (NEW)
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    copies: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.Prompt || mongoose.model("Prompt", PromptSchema);
