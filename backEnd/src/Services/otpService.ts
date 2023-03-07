import crypto from "crypto";
//@ts-ignore
import twilio from "twilio";
import { hashService } from "../Services/hashService";

/***_______  TWILIO setUP   ________**/

class OtpService {
  /***_______  GENERATE OTP   ________**/

  async generate() {
    const otp = crypto.randomInt(100000, 999999);
    return otp;
  }

  /***_______  Verify OTP   ________**/

  async verifyOtp(hashOtp: string, data: string) {
    try {
      let computedHash = await hashService.hashData(data);
      return computedHash === hashOtp;
    } catch (err: any) {
      return err?.message;
    }
  }

  /***_______  SENDING SMS with TWILIO   ________**/

  async sendBySms(phone: string, otp: string) {
    try {
      const sms_auth = process.env.TWILIO_AUTH_SID;
      const sms_token = process.env.TWILIO_AUTH_TOKEN;
      const client = twilio(sms_auth, sms_token, { lazyLoading: false });
      /***_______   ONLY IND number  ________**/

      const IND_NO = `+91 ${phone}`;
      return client.messages.create({
        to: IND_NO,
        from: process.env.TWILIO_AUTH_NUMBER,
        body: `Your ABIR BORDCAST OTP IS :${otp}`,
      });
    } catch (err: any) {
      return err.messages;
    }
  }
}
const otpService = new OtpService();
export { otpService };
