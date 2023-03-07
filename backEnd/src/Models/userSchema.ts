import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    phone: { type: String, required: true },
    name: { type: String, required: false },
    avatar: { type: String, required: false },
    activated: { type: Boolean, required: false, default: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export { User };
