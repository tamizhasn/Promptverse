import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
  {
    // 🔹 Basic Info
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false, // 🔐 never return password by default
    },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },

    // 🔹 Profile
    profileImage: {
      type: String, // Cloudinary / CDN URL
      default: "",
    },

    bio: {
      type: String,
      maxlength: 300,
      default: "",
    },

    dob: {
      type: Date,
    },

    mobile: {
      type: String,
    },

    // 🔹 Terms & Compliance
    termsAccepted: {
      type: Boolean,
      default: false,
    },

    // 🔹 Relations
    createdPrompts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Prompt",
      },
    ],

    // 🔹 Account Status (future-proofing)
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

export default models.User || mongoose.model("User", UserSchema);
