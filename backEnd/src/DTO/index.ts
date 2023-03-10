/***_______  DTO Data Transfare Protocal   ________**/

import { Date, Types } from "mongoose";

interface IuserObj {
  _id: Types.ObjectId;
  phone: string;
  avatar: string;
  activated: boolean;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

class UserDto {
  _id: Types.ObjectId;
  phone: string;
  activated: boolean;
  avatar: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(user: IuserObj) {
    this._id = user._id;
    this.phone = user.phone;
    this.activated = user.activated;
    this.avatar = user.avatar;
    this.name = user.name;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
export { UserDto };
