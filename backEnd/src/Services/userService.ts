import fs from "fs";
import { Types } from "mongoose";
import { User } from "../Models/userSchema";

export interface I_phone {
  phone: string;
}

interface Imono_id {
  _id: Types.ObjectId;
}
/***_______  User Interface   ________**/

interface InewUser {
  phone: string;
  activated: boolean;
}

class UserService {
  /***_______  Find User   ________**/

  async findUser(fillter: I_phone) {
    try {
      const user = await User.findOne(fillter);
      return user;
    } catch (err) {
      return err;
    }
  }
  /***_______  create User   ________**/

  async createUser(data: InewUser) {
    const newUser = await User.create(data);
    return newUser;
  }
  /***_______ Find user By iD    ________**/
  async findUserById({ _id }: Imono_id) {
    try {
      const user = await User.findById({ _id });
      return user;
    } catch (err) {
      return err;
    }
  }
  /***_______  Update User   ________**/
  async updateUser({ _id }: Imono_id, updatedData: object) {
    try {
      const newUser = await User.findByIdAndUpdate({ _id }, updatedData, {
        new: true,
      });
      return newUser;
    } catch (err) {
      return err;
    }
  }
  async deleteFile(path: string) {
    fs.unlink(path, (err) => {
      if (err) {
        console.log(err.message);
      }
    });
  }
}
const userService = new UserService();
export { userService };
