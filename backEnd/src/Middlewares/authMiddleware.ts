import { NextFunction, Request, Response } from "express";
import { tokenService } from "../Services/tokenService";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) throw new Error();
    const decoded = tokenService.verifyAccessToken(accessToken);
    if (!decoded) throw new Error();
    //@ts-ignore
    req.user = decoded;
    next();
  } catch (err: any) {
    console.log(err?.message);
    res.status(401).json({ message: "invalid token!" });
  }
}
