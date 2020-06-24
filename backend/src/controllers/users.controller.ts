import * as express from "express";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import Users from "../models/users.model";

export default class UsersController {
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post("/auth/signup", this.signup);
    this.router.post("/auth/login", this.login);
  }

  // Signup
  public signup = (req: Request, res: Response) => {
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        const users = new Users({
          email: req.body.email,
          password: hash,
        });
        users
          .save()
          .then(() => res.status(201).json({ message: "User created!" }))
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  };

  // Login
  public login = (req: Request, res: Response) => {
    Users.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          return res.status(401).json({ error: "User not found!" });
        }
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              return res.status(401).json({ error: "Wrong password!" });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign({ userId: user._id }, "udl*VFMnxp5Crly-({", {
                expiresIn: "24h",
              }),
            });
          })
          .catch((error) => res.status(500).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  };
}
