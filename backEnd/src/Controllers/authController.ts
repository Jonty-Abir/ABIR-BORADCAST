// Internal Import's
import { Request, Response } from "express";
// external Import's
import { hashService } from "../Services/hashService";
import { otpService } from "../Services/otpService";

class AuthController {
  /***_______  SEND OTP && CREATE   ________**/

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
      //   await otpService.sendBySms(phoneNo, otp);
      res.status(200).json({ hash: `${hashOtp}.${expire}` });
    } catch (err: any) {
      res
        .status(500)
        .json({ error: "Serverside Error!", errMsg: err?.message });
    }
  }
  /***_______  verifyOtp   ________**/
  async verifyOtp(req: Request, res: Response) {
    try {
      const { otp, hash, phone } = req.body;
      if (!otp || !hash || !phone) {
        return res.status(400).json({ error: "All fields are required!" });
      }

      const [hashOtp, expire] = hash.split(".");
      if (Date.now() > expire) {
        return res.status(400).json({ error: "OTP Expired!" });
      }
      const data = `${phone}.${otp}.${expire}`;
      const isValid = await otpService.verifyOtp(hashOtp, data);
      if (!isValid) {
        return res.status(400).json({ error: "Invalid OTP!" });
      }
      let user;
    } catch (err) {
      res.status(500).json({ error: "serverside error!" });
    }
  }
}
const authController = new AuthController();
export { authController };
