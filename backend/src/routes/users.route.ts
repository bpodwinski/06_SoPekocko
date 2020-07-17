import UsersController from "../controllers/users.controller";

import * as express from "express";

export default class SaucesRoute {
  public router = express.Router();
  public Users = new UsersController();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post("/auth/signup", this.Users.userRegistration);
    this.router.post("/auth/login", this.Users.userLogin);
  }
}
