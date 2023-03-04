import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export function defaultErrorHandler(
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err) {
    next(err);
  }
}

export function notFound(req: Request, res: Response) {
  res.status(404).send("Not Found!");
}
