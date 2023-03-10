import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    phone: { type: String, required: true },
    name: { type: String, required: false },
    avatar: {
      type: String,
      required: false,
      get: (avatar: String) => `${process.env.STATIC_URL}${avatar}`,
    },
    activated: { type: Boolean, required: false, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      getters: true,
    },
  }
);

const User = mongoose.model("User", userSchema);
export { User };
