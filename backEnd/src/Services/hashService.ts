import crypto from "crypto";

class HashService {
  async hashData(data: string) {
    const hash = crypto
      .createHmac("sha256", process.env.SECRET as string)
      .update(data.toString())
      .digest("hex");
    return hash;
  }
}
const hashService = new HashService();
export { hashService };
