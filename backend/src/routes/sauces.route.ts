import * as express from "express";
import SaucesController from "../controllers/sauces.controller";

export default class SaucesRoute {
  public router = express.Router();
  public Sauces = new SaucesController();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get("/sauces", this.Sauces.getAllSauce);
    this.router.get("/sauces/:id", this.Sauces.getOneSauce);
    this.router.post("/sauces", this.Sauces.createSauce);
    this.router.put("/sauces/:id", this.Sauces.modifySauce);
    this.router.delete("/sauces/:id", this.Sauces.deleteSauce);
    this.router.post("/sauces/:id/like", this.Sauces.likeOrDislike);
  }
}
