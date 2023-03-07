/***_______  DTO Data Transfare Protocal   ________**/

import { Types } from "mongoose";

interface IuserObj {
  _id: Types.ObjectId;
  phone: string;
  avatar: string;
  activated: boolean;
  name: string;
}

class UserDto {
  _id: Types.ObjectId;
  phone: string;
  activated: boolean;
  avatar: string;
  name: string;

  constructor(user: IuserObj) {
    this._id = user._id;
    this.phone = user.phone;
    this.activated = user.activated;
    this.avatar = user.avatar;
    this.name = user.name;
  }
}
export { UserDto };
