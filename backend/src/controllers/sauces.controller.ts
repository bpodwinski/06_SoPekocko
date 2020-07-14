import Error from "../exceptions/AppException";
import { Request, Response, NextFunction } from "express";
import * as fs from "fs";
import * as Server from "../server";
import Sauces from "../models/sauces.model";

export default class SaucesController {
  // Get all sauces
  public async getAllSauce(req: Request, res: Response, next: NextFunction) {
    try {
      const sauces: any = await Sauces.find();
      res.status(200).json(sauces);
    } catch (error) {
      next(error);
    }
  }

  // Get one sauce by id
  public async getOneSauce(req: Request, res: Response, next: NextFunction) {
    try {
      const sauce: any = await Sauces.findOne({
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
      const sauce: any = new Sauces({
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
      const sauce: any = await Sauces.findOne({
        _id: req.params.id,
      });
      if (!sauce) {
        throw new Error(404, "Not found");
      }
      const filename: string = sauce.imageUrl.split("/img/")[1];
      const deleteSauce: any = await Sauces.deleteOne({
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
      const sauceObject: object = req.file
        ? {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.hostname}:${Server.PORT}/img/${req.file.filename}`,
          }
        : { ...req.body };

      const sauce: any = await Sauces.updateOne(
        { _id: req.params.id },
        { ...sauceObject, _id: req.params.id }
      );

      res.status(200).json({ message: sauce });
    } catch (error) {
      next(error);
    }
  }
  // Like and Dislike
  public likeOrDislike(req: Request, res: Response, next: NextFunction) {
    // User like = 1
    if (req.body.like === 1) {
      Sauces.updateOne(
        { _id: req.params.id },
        {
          $inc: { likes: req.body.like },
          $push: { usersLiked: req.body.userId },
        }
      )
        .then((sauce) => res.status(200).json({ message: sauce }))
        .catch((error) => next(error));

      // User dislike = -1
    } else if (req.body.like === -1) {
      Sauces.updateOne(
        { _id: req.params.id },
        {
          $inc: { dislikes: req.body.like * -1 },
          $push: { usersDisliked: req.body.userId },
        }
      )
        .then((sauce) => res.status(200).json({ message: sauce }))
        .catch((error) => next(error));

      // User like = 0
    } else {
      Sauces.findOne({ _id: req.params.id })
        .then((sauce) => {
          if (!sauce) {
            throw new Error(404, "Not found");
          }
          if (sauce.usersLiked.includes(req.body.userId)) {
            Sauces.updateOne(
              { _id: req.params.id },
              { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } }
            )
              .then((sauce) => {
                res.status(200).json({ message: sauce });
              })
              .catch((error) => next(error));
          } else if (sauce.usersDisliked.includes(req.body.userId)) {
            Sauces.updateOne(
              { _id: req.params.id },
              {
                $pull: { usersDisliked: req.body.userId },
                $inc: { dislikes: -1 },
              }
            )
              .then((sauce) => {
                res.status(200).json({ message: sauce });
              })
              .catch((error) => next(error));
          }
        })
        .catch((error) => next(error));
    }
  }
}
