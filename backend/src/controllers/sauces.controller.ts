import * as express from "express";
import { Request, Response } from "express";
import Sauces from "../models/sauces.model";

export default class SaucesController {
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get("/sauces", this.list);
  }

  // List all sauces
  public list = (req: Request, res: Response) => {
    Sauces.find()
      .then((sauces) => {
        res.status(200).json(sauces);
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  };
}
