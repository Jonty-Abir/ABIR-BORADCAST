import mongoose, { Schema } from "mongoose";

const refreshTokenChema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    token: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const RefreshToken = mongoose.model(
  "RefreshToken",
  refreshTokenChema,
  "tokens"
);
export { RefreshToken };
