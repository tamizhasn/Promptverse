import mongoose, { Schema, models } from "mongoose";

const PromptSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    promptText: { type: String, required: true },

    category: { type: String, index: true },
    outputType: { type: String, index: true },
    difficulty: { type: String, index: true },

    tags: [{ type: String, index: true }],

    previewImage: { type: String },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    copies: { type: Number, default: 0 },

    reportCount: { type: Number, default: 0 },
    isHidden: { type: Boolean, default: false },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
  },
  { timestamps: true }
);

/* 🔍 TEXT SEARCH INDEX */
PromptSchema.index({
  title: "text",
  description: "text",
  promptText: "text",
  category: "text",
  tags: "text",
});

export default models.Prompt ||
  mongoose.model("Prompt", PromptSchema);
