import { NextFunction, Request, Response } from "express";
import AppError from "../exceptions/AppException";

export default function errorMiddleware(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status: number = err.status || 500;
  const message: string = err.message || "Internal Server Error";

  res.status(status).send({
    status,
    message,
  });
}
