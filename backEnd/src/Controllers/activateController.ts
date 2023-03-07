import { Request, Response } from "express";
import jimp from "jimp";
import path from "path";
import { UserDto } from "../DTO";
import { userService } from "../Services/userService";

class ActivateController {
  async activate(req: Request, res: Response) {
    try {
      const { name, avatar } = req.body;
      if (!name || !avatar) {
        res.status(401).json({ message: "all fields are required!" });
      }
      const rowBase = avatar.split(",")[1];
      const buffer = Buffer.from(rowBase, "base64");
      const compressData = await jimp.read(buffer);

      /***_______Create Image Path________**/

      const imagePath = `${Date.now()}_${Math.round(Math.random() * 1e9)}.png`;

      /***_______Compress Image________**/

      compressData
        .resize(150, jimp.AUTO)
        .write(path.resolve(__dirname, `../public/uploads/${imagePath}`));

      //@ts-ignore
      const userId = req.user._id;

      const user: any = await userService.findUserById({ _id: userId });
      if (!user) {
        res.status(404).json({ message: "user not found!" });
      }
      /***_______  deleteing exsiating avatar   ________**/

      if (user.avatar) {
        await userService.deleteFile(`./public/uploads/${user.avatar}`);
      }

      /***_______   Update User  ________**/

      const updateData = {
        name,
        avatar: imagePath,
        activated: true,
      };
      const newUser: any = await userService.updateUser(
        { _id: user._id },
        updateData
      );

      res.status(200).json({ user: new UserDto(newUser), auth: true });
    } catch (err) {
      res.status(500).json({ error: "serverside Error!" });
    }
  }
}

const activateController = new ActivateController();
export { activateController };
