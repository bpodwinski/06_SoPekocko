import * as express from "express";
import { Request, Response, NextFunction } from "express";
import * as fs from "fs";
import * as Server from "../server";
import Sauces from "../models/sauces.model";

export default class SaucesController {
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get("/sauces", this.getAllSauce);
    this.router.get("/sauces/:id", this.getOneSauce);
    this.router.post("/sauces", this.createSauce);
    this.router.put("/sauces/:id", this.modifySauce);
    this.router.delete("/sauces/:id", this.deleteSauce);
  }

  // Get all sauces
  public async getAllSauce(req: Request, res: Response, next: NextFunction) {
    try {
      const sauces = await Sauces.find();
      res.status(200).json(sauces);
    } catch (error) {
      next(error);
    }
  }

  // Get one sauce by id
  public async getOneSauce(req: Request, res: Response, next: NextFunction) {
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
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.hostname}:${Server.PORT}/img/${req.file.filename}`,
      });
      await sauce.save();
      res.status(201).json({ message: sauce });
    } catch (error) {
      next(error);
    }
  }

  // Delete sauce
  public async deleteSauce(req: Request, res: Response, next: NextFunction) {
    try {
      const sauce = await Sauces.findOne({
        _id: req.params.id,
      });
      if (!sauce) {
        throw next(new Error("Not found"));
      }
      const filename = sauce.imageUrl.split("/img/")[1];
      const deleteSauce = await Sauces.deleteOne({
        _id: req.params.id,
      });

      fs.unlink(`img/${filename}`, (error) => {
        if (error) throw next(error);
      });

      res.status(201).json({ message: deleteSauce });
    } catch (error) {
      next(error);
    }
  }

  // Modify sauce
  public async modifySauce(req: Request, res: Response, next: NextFunction) {
    try {
      const sauceObject = req.file
        ? {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.hostname}:${Server.PORT}/img/${req.file.filename}`,
          }
        : { ...req.body };

      const sauce = await Sauces.updateOne(
        { _id: req.params.id },
        { ...sauceObject, _id: req.params.id }
      );

      res.status(200).json({ message: sauce });
    } catch (error) {
      next(error);
    }
  }
}
