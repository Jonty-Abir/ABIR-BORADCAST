import mongoose, { Schema, Types } from "mongoose";

const roomsSchema = new Schema(
  {
    tropic: { type: String, required: true },
    roomType: { type: String, required: true },
    creatorId: { type: Types.ObjectId, required: true, ref: "User" },
    speaker: {
      type: [
        {
          type: Types.ObjectId,
          ref: "User",
        },
      ],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model("Room", roomsSchema);
export { Room };
