import * as express from "express";
import { Request, Response, NextFunction } from "express";
import * as compression from "compression";
import * as mongoose from "mongoose";
import * as path from "path";

export default class App {
  public app: express.Application;
  public host: string;
  public port: number;

  constructor(appInit: {
    host: string;
    port: number;
    middlewares: any;
    routes: any;
  }) {
    this.app = express();
    this.host = appInit.host;
    this.port = appInit.port;

    this.dbConnector();
    this.options();
    this.middlewares(appInit.middlewares);
    this.routes(appInit.routes);
    this.handlerError();
  }

  private middlewares(middlewares: {
    forEach: (arg0: (middleware: any) => void) => void;
  }) {
    middlewares.forEach((middleware) => {
      this.app.use(middleware);
    });
  }

  private routes(routes: { forEach: (arg0: (routes: any) => void) => void }) {
    routes.forEach((routes) => {
      this.app.use("/api", routes.router);
    });
  }

  private async dbConnector() {
    await mongoose.connect(
      "mongodb+srv://user98fhdg1:p3wn0uKhEPVD7soH@cluster0-3mlir.azure.mongodb.net/sopekocko?retryWrites=true&w=majority",
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  }

  private options() {
    this.app.use(compression());
    this.app.use("/img", express.static(path.join(__dirname, "../img")));
  }

  private handlerError() {
    this.app.use(function (
      err: Error,
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      console.error(err);

      if (err) {
        // 400 Bad Request
        if (err instanceof mongoose.Error.ValidationError === true) {
          res.status(400).json({
            error: {
              status: 400,
              message: err,
            },
          });
        }

        // 401 Unauthorized
        if (
          err.name === "JsonWebTokenError" ||
          err.name === "TokenExpiredError" ||
          err.toString().includes("User not found") ||
          err.toString().includes("Passwords don't match")
        ) {
          res.status(401).json({
            error: {
              status: 401,
              message: err,
            },
          });

          //500 Internal Server Error
        } else {
          res.status(500).json({
            error: {
              status: 500,
              message: "Internal Server Error",
            },
          });
        }
      }
    });
  }

  public listen() {
    this.app.listen(this.port, this.host, () => {
      console.log(`App listening on the http://${this.host}:${this.port}`);
    });
  }
}
