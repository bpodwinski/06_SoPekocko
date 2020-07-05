import * as express from "express";
import UsersController from "../controllers/users.controller";

export default class SaucesRoute {
  public router = express.Router();
  public Users = new UsersController();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post("/auth/signup", this.Users.signup);
    this.router.post("/auth/login", this.Users.login);
  }
}
