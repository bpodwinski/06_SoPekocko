import * as Server from "../server";
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export default class Auth {
  public auth(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader: any = req.headers["authorization"];
      const token: any = authHeader && authHeader.split(" ")[1];

      if (token === null) throw "There isn't token";

      const decodedToken: any = jwt.verify(token, Server.TOKEN);
      const userId: string = decodedToken.userId;

      if (req.body.userId && req.body.userId !== userId) {
        throw "Invalid user ID";
      } else {
        next();
      }
    } catch (error) {
      next(error);
    }
  }
}
