// external Import's
import { Request, Response } from "express";
import { User } from "../Models/userSchema";

// Internal Import's
import { UserDto } from "../DTO";
import { hashService } from "../Services/hashService";
import { otpService } from "../Services/otpService";
import { tokenService } from "../Services/tokenService";
import { userService } from "../Services/userService";

class AuthController {
  /***______________________________  SEND OTP && CREATE   _______________________________**/

  async sendOtp(req: Request, res: Response) {
    try {
      const { phoneNo } = req.body;
      if (!phoneNo) {
        return res.status(400).json({ error: "Phone No is Required*" });
      }
      const otp = await otpService.generate();
      /***_______  Expire time / hash otp  ________**/
      const ttl = 1000 * 60 * 2; // 2min
      const expire = Date.now() + ttl;
      const data = `${phoneNo}.${otp}.${expire}`;
      const hashOtp = await hashService.hashData(data);
      /***_______   send otp  ________**/
      // await otpService.sendBySms(phoneNo, otp); //TODO
      res
        .status(200)
        .json({ hash: `${hashOtp}.${expire}`, otp, phone: phoneNo });
    } catch (err: any) {
      res
        .status(500)
        .json({ error: "Serverside Error!", errMsg: err?.message });
    }
  }
  /***______________________________  verifyOtp   _______________________________**/

  async verifyOtp(req: Request, res: Response) {
    try {
      const { otp, hash, phone } = req.body;
      if (!otp || !hash || !phone) {
        return res.status(400).json({ error: "All fields are required!" });
      }

      const [hashOtp, expire] = hash.split(".");
      // conver to string "+"
      if (Date.now() > +expire) {
        return res.status(400).json({ error: "OTP Expired!" });
      }
      const data = `${phone}.${otp}.${+expire}`;

      const isValid = await otpService.verifyOtp(hashOtp, data);
      if (!isValid) {
        return res.status(400).json({ error: "Invalid OTP!" });
      }

      let user: any;
      user = await userService.findUser({ phone: phone });

      /***_______ CHECK USER ALREADY IN DATABASE   ________**/
      if (!user) {
        const newUser = new User({
          phone,
          activated: false,
        });
        user = await newUser.save();
      }
      const { accessToken, refreshToken } = tokenService.generateToken({
        _id: user._id,
        activated: false,
      });

      /***_______  Store Refresh token in DB   ________**/
      await tokenService.storeRefreshToken(refreshToken, user._id);

      res.cookie("refreshToken", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
      });
      res.cookie("accessToken", accessToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
      });

      //@ts-ignore
      const userDtoForClient = new UserDto(user);

      res.status(200).json({ auth: true, user: userDtoForClient });
    } catch (err: any) {
      console.log(err?.message);
      res.status(500).json({ error: "serverside error!" });
    }
  }
  /***___________________________  Refresh Token   ________________________________________**/

  async refreshToken(req: Request, res: Response) {
    // get refresh token from cookie
    const { refreshToken: refreshTokenFromCookie } = req.cookies;
    // check token is valid or not
    let userData: any;
    try {
      // decoded data for jwt
      userData = await tokenService.verifyRefreshToken(refreshTokenFromCookie);
    } catch (err) {
      return res.status(401).json({ message: "invalid token!" });
    }
    // check token in DB
    try {
      const token = await tokenService.findRefreshToken(
        userData._id,
        refreshTokenFromCookie
      );
      if (!token) {
        return res.status(401).json({ message: "Invalid token!" });
      }
    } catch (err) {
      return res.status(500).json({ message: "internal server error!" });
    }
    // check is valid user
    const user: any = await userService.findUserById({ _id: userData?._id });
    if (!user) {
      return res.status(404).json({ message: "user not found!" });
    }
    // generate new token
    const { refreshToken, accessToken } = tokenService.generateToken({
      _id: user._id,
      activated: user.activated,
    });
    // upadate refreshtoken
    try {
      await tokenService.updateRefreshToken(user._id, refreshToken);
    } catch (err) {
      return res.status(500).json({ message: "internal server error!" });
    }
    // put in cookie

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });
    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    //@ts-ignore
    const userDtoForClient = new UserDto(user);

    // response
    res.status(200).json({ auth: true, user: userDtoForClient });
  }
  /***_______  Logout User   ________**/

  async userLogout(req: Request, res: Response) {
    const { refreshToken } = req.cookies;
    try {
      // delete refresh token from DB
      await tokenService.removeToken(refreshToken);
      // Delete cookies
      res.clearCookie("refreshToken");
      res.clearCookie("accessToken");
      return res.status(200).json({ message: "success", user: null });
    } catch (err) {
      res.status(500).json({ message: "error was occure while user logout!" });
    }
  }
}
const authController = new AuthController();
export { authController };
