import { Types } from "mongoose";
import { RoomDto } from "../DTO/roomDto";
import { Room } from "../Models/roomsSchema";
interface Irooms {
  tropic: string;
  roomType: string;
  creatorId: Types.ObjectId;
}

class RoomsService {
  /***_______  Create Rooms   ________**/

  async create(payload: Irooms) {
    try {
      const room = await Room.create({
        roomType: payload.roomType,
        tropic: payload.tropic,
        creatorId: payload.creatorId,
        speaker: [payload.creatorId],
      });
      return room;
    } catch (err: any) {
      console.log(err.message);
      return err;
    }
  }
  /***_______  Get all Rooms   ________**/

  async getAlRooms(types: [string]) {
    const rooms = await Room.find({ roomType: { $in: types } })
      .populate("speaker")
      .populate("creatorId")
      .exec();
    const allRooms = rooms.map((room: any) => new RoomDto(room));
    return allRooms;
  }
}
const roomsService = new RoomsService();
export { roomsService };
