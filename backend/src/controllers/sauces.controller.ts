import * as express from "express";
import { Request, Response, NextFunction } from "express";
import Sauces from "../models/sauces.model";

export default class SaucesController {
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get("/sauces", this.allSauce);
    this.router.get("/sauces/:id", this.oneSauce);
    this.router.post("/sauces", this.createSauce);
  }

  // Get all sauces
  public async allSauce(req: Request, res: Response, next: NextFunction) {
    try {
      const sauces = await Sauces.find();
      res.status(200).json(sauces);
    } catch (error) {
      next(error);
    }
  }

  // Get one sauce by id
  public async oneSauce(req: Request, res: Response, next: NextFunction) {
    try {
      const sauce = await Sauces.findOne({
        _id: req.params.id,
      });
      res.status(200).json(sauce);
    } catch (error) {
      next(error);
    }
  }

  // Create sauce
  public async createSauce(req: Request, res: Response, next: NextFunction) {
    try {
      const sauce = new Sauces({
        ...req.body,
      });
      await sauce.save();
      res.status(201).json({ message: sauce });
    } catch (error) {
      next(error);
    }
  }
}
