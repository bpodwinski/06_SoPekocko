import AppException from "../exceptions/app.exception";
import { NextFunction, Request, Response } from "express";

export default function errorMiddleware(
  err: AppException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const httpStatus: number = err.httpStatus || 500;
  const message: string = err.message || "Internal Server Error";

  res.status(httpStatus).send({
    httpStatus,
    message,
  });
}
