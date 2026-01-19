import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },

    profileImage: { type: String, default: "" },
    dob: Date,
    mobile: String,

    // ✅ MUST BE HERE
    termsAccepted: {
      type: Boolean,
      default: false,
    },

    profileCompleted: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default models.User || mongoose.model("User", UserSchema);
