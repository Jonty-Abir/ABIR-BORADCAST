import { Date, Types } from "mongoose";

interface Iuser {
  _id: Types.ObjectId;
  roomType: string;
  tropic: string;
  creatorId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  speaker: [any];
}

class RoomDto {
  _id: Types.ObjectId;
  roomType: string;
  tropic: string;
  creatorId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  speaker: [any];
  constructor(room: Iuser) {
    this._id = room._id;
    this.creatorId = room.creatorId;
    this.tropic = room.tropic;
    this.roomType = room.roomType;
    this.updatedAt = room.updatedAt;
    this.createdAt = room.createdAt;
    this.speaker = room.speaker;
  }
}

export { RoomDto };
