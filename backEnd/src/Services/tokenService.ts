import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { RefreshToken } from "../Models/refreshTokenSchema";

export interface Ipayload {
  _id: Types.ObjectId;
  activated: boolean;
}

class TokenService {
  /***______________________________  genarate token   _______________________________**/

  generateToken(payload: Ipayload) {
    /***_______   Genarate Access Token  ________**/

    const accessToken = jwt.sign(
      payload,
      process.env.JWT_ACCESS_TOKEN_SECRET as string,
      { expiresIn: "1m" }
    );
    /***_______   Genarate Refresh Token  ________**/

    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_TOKEN_SECRET as string,
      { expiresIn: "1y" }
    );
    return { accessToken, refreshToken };
  }
  /***______________________________  store Refresh Token  _______________________________**/

  async storeRefreshToken(token: string, userId: Types.ObjectId) {
    try {
      await RefreshToken.create({ token, userId });
    } catch (err: any) {
      console.log(err.message);
    }
  }
  /***______________________________ Verify AccessToken    __________________________**/

  verifyAccessToken(token: string) {
    return jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET as string);
  }
  /***______________________________  verify Refresh Token  _______________________________**/

  async verifyRefreshToken(token: string) {
    return jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET as string);
  }
  /***______________________________  find Refresh Token  _______________________________**/

  async findRefreshToken(id: string, refreshToken: string) {
    return await RefreshToken.findOne({ userId: id, token: refreshToken });
  }
  /***______________________________  update refresh token   _______________________________**/

  async updateRefreshToken(userId: string, token: string) {
    return await RefreshToken.updateOne({ userId }, { token }, { new: true });
  }
  /***______________________________  Remove refresh token   _______________________________**/

  async removeToken(refreshToken: string) {
    try {
      await RefreshToken.deleteOne({ token: refreshToken });
    } catch (error) {
      return error;
    }
  }
}
const tokenService = new TokenService();

export { tokenService };
