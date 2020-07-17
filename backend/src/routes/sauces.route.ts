import Auth from "../middlewares/auth.middleware";
import SaucesController from "../controllers/sauces.controller";

import * as express from "express";

export default class SaucesRoute {
  public router = express.Router();
  public Auth = new Auth().auth;
  public Sauces = new SaucesController();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get("/sauces", this.Auth, this.Sauces.getAllSauce);
    this.router.get("/sauces/:id", this.Auth, this.Sauces.getOneSauce);
    this.router.post("/sauces", this.Auth, this.Sauces.createSauce);
    this.router.put("/sauces/:id", this.Auth, this.Sauces.modifySauce);
    this.router.delete("/sauces/:id", this.Auth, this.Sauces.deleteSauce);
    this.router.post("/sauces/:id/like", this.Auth, this.Sauces.likeOrDislike);
  }
}
