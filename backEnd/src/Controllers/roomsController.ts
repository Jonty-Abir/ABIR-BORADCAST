import { Request, Response } from "express";
import { RoomDto } from "../DTO/roomDto";
import { roomsService } from "../Services/roomsService";

class Rooms {
  /***_______  Create Rooms   ________**/

  async create(req: Request, res: Response) {
    const { tropic, roomType } = req.body;
    if (!tropic || !roomType) {
      return res.status(400).json({ message: "All feilds are required!" });
    }
    try {
      //@ts-ignore
      const user = req.user;
      const room = await roomsService.create({
        tropic,
        roomType,
        creatorId: user._id,
      });
      res.status(200).json({ message: "OK", room: new RoomDto(room) });
    } catch (err) {
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  }

  /***_______  Get All Rooms   ________**/

  async getAllRooms(req: Request, res: Response) {
    try {
      const rooms = await roomsService.getAlRooms(["open"]);
      return res.status(200).json({ message: "success", rooms });
    } catch (err: any) {
      console.log(err.message);
      res.status(500).json({ message: "error was occure while get rooms" });
    }
  }
}
const rooms = new Rooms();
export { rooms };
